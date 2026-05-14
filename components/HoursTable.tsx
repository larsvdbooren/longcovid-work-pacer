import { Card, CardContent, CardDescription } from "./ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import hoursTable from "@/lib/hours-table.json";
import { Briefcase, Coffee, Utensils } from "lucide-react";

const rowConfig = {
  Werk: {
    icon: Briefcase,
    rowClass: "",
    iconClass: "text-foreground",
  },
  Pauze: {
    icon: Coffee,
    rowClass: "bg-blue-950/40",
    iconClass: "text-blue-400",
  },
  "Lunch pauze": {
    icon: Utensils,
    rowClass: "bg-green-950/40",
    iconClass: "text-green-400",
  },
} as const;

const START_TIME_MINUTES = 9 * 60;
const DEFAULT_LUNCH_PAUZE = 1.5;

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

function formatDuur(hours: number): string {
  const h = Math.floor(hours);
  const m = (hours % 1) * 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}u`;
  return `${h}u ${m}`;
}

export default function HoursTable({
  dayHours,
  gevoel,
}: {
  dayHours: number;
  gevoel: "goed" | "slecht";
}) {
  const gevoelData = hoursTable.gevoel[gevoel];
  const entry = gevoelData.totaal.find((item) => item.uren === dayHours);
  if (!entry) return null;

  const effectivePauze =
    gevoel === "slecht" && dayHours >= 6.5 ? 0.5 : gevoelData.pauze;
  const baseLunchPauze =
    (gevoelData as { lunchPauze?: number }).lunchPauze ?? DEFAULT_LUNCH_PAUZE;
  const effectiveLunchPauze = dayHours >= 6 ? 1 : baseLunchPauze;

  let cursor = START_TIME_MINUTES;
  type RowType = "Werk" | "Pauze" | "Lunch pauze";
  const rows: { tijd: string; type: RowType; duur: string }[] = [];

  const lunchWindow = (t: number) => t >= 12 * 60 && t <= 13 * 60;

  entry.blokken.forEach((blok, i) => {
    const werkStart = cursor;
    cursor += blok * 60;
    rows.push({
      tijd: `${minutesToTime(werkStart)} - ${minutesToTime(cursor)}`,
      type: "Werk",
      duur: formatDuur(blok),
    });

    const isLastBlok = i === entry.blokken.length - 1;
    if (!isLastBlok) {
      const isLunch =
        lunchWindow(cursor) || lunchWindow(cursor + effectivePauze * 60);
      const pauzeDuur = isLunch ? effectiveLunchPauze : effectivePauze;
      const pauzeStart = cursor;
      cursor += pauzeDuur * 60;
      rows.push({
        tijd: `${minutesToTime(pauzeStart)} - ${minutesToTime(cursor)}`,
        type: isLunch ? "Lunch pauze" : "Pauze",
        duur: formatDuur(pauzeDuur),
      });
    }
  });

  return (
    <Card className="mx-6">
      <CardContent>
        <CardDescription>Jouw planning:</CardDescription>
        <Table>
          <TableCaption>Uren overzicht.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Tijd</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Duur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              const config = rowConfig[row.type];
              const Icon = config.icon;
              return (
                <TableRow key={i} className={config.rowClass}>
                  <TableCell className="font-medium">{row.tijd}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <Icon size={14} className={config.iconClass} />
                      {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{row.duur}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

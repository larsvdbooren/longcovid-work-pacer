"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import HoursTable from "./HoursTable";

export default function MainCard() {
  const [dayHours, setDayHours] = useState(4);
  const [gevoel, setGevoel] = useState<"goed" | "slecht">("goed");

  function addDayHours() {
    setDayHours((prev) => prev + 0.5);
  }
  function subtractDayHours() {
    setDayHours((prev) => prev - 0.5);
  }

  const MIN_HOURS = 3;
  const MAX_HOURS = 7;

  return (
    <Card className="w-full max-w-160 bg-stone-950">
      <CardHeader className="pb-4 border-b ">
        <CardTitle className="text-lg font-bold">Vandaag</CardTitle>
        <CardDescription>
          {new Date().toLocaleDateString("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-0">
          <CardContent className="flex flex-col p-2 gap-2">
            <CardDescription className="p-2">
              Hoe voel je je vandaag?
            </CardDescription>
            <RadioGroup
              value={gevoel}
              onValueChange={(v) => setGevoel(v as "goed" | "slecht")}
            >
              <FieldLabel htmlFor="goed">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="text-lg">Goed</FieldTitle>
                    <FieldDescription>
                      Kortere pauzes, minder maar langere werk blokken.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="goed" id="goed" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="slecht">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="text-lg">Slecht</FieldTitle>
                    <FieldDescription>
                      Langere pauzes, meer maar korte werk blokken
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="slecht" id="slecht" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="flex flex-col p-2 gap-2">
            <CardDescription className="p-2">
              Hoeveel uren wil je werken vandaag?
            </CardDescription>
            <div className="flex justify-center gap-5 items-center w-full mx-auto p-5 bg-stone-950 border rounded-xl">
              <Button
                size="icon-lg"
                aria-label="subtract"
                variant="outline"
                onClick={subtractDayHours}
                disabled={dayHours <= MIN_HOURS}
              >
                <Minus />
              </Button>
              <p className="text-3xl font-semibold w-15 text-center">
                {dayHours}
              </p>
              <Button
                size="icon-lg"
                aria-label="add"
                variant="outline"
                onClick={addDayHours}
                disabled={dayHours >= MAX_HOURS}
              >
                <Plus />
              </Button>
            </div>
          </CardContent>
        </Card>
      </CardContent>
      <HoursTable dayHours={dayHours} gevoel={gevoel} />
    </Card>
  );
}

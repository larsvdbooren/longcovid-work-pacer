import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex items-center justify-center">
        <Card className="max-w-160 px-4">
          <CardHeader className="pb-4 border-b ">
            <CardTitle className="text-lg font-bold">Vandaag</CardTitle>
            <CardDescription className="">Donderdag 14 mei</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="">
              <RadioGroup defaultValue="goed">
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
            </div>
            <div className="w-fill h-fill bg-">
              <p>Hi</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "./ui/card";

const content = [
  {
    value: "syntax",
    description: "How it works.",
    boxes: [
      {
        boxTitle: "Variables",
        boxDescription: (
          <p>
            Declare variables with the <code>let</code> keyword.
          </p>
        ),
        boxCode: (
          <pre className="bg-zinc-800 text-green-400 p-3 rounded-md overflow-x-auto">
            let x = 10;
            <br />
            let y = "hello";
            <br />
            let isTrue = true;
          </pre>
        ),
      },
      {
        boxTitle: "Data Types",
        boxDescription: (
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Integers:</strong>{" "}
              <code className="bg-muted px-1 rounded">5, 10, -20</code>
            </li>
            <li>
              <strong>Strings:</strong>{" "}
              <code className="bg-muted px-1 rounded">"hello", "world"</code>
            </li>
            <li>
              <strong>Booleans:</strong>{" "}
              <code className="bg-muted px-1 rounded">true, false</code>
            </li>
            <li>
              <strong>Arrays:</strong>{" "}
              <code className="bg-muted px-1 rounded">[1, 2, 3]</code>
            </li>
            <li>
              <strong>Hashes:</strong>{" "}
              <code className="bg-muted px-1 rounded">
                {"{"}"key": "value"{"}"}
              </code>
            </li>
            <li>
              <strong>Functions:</strong> First-class functions
            </li>
            <li>
              <strong>Null:</strong>{" "}
              <code className="bg-muted px-1 rounded">null</code>
            </li>
          </ul>
        ),
      },
      {
        boxTitle: "If Statements",
        boxCode: (
          <pre className="bg-zinc-800 text-green-400 p-3 rounded-md overflow-x-auto">
            if (x {">"} 5) {"{"}
            <br />
            &nbsp;&nbsp;return "greater";
            <br />
            {"}"} else {"{"}
            <br />
            &nbsp;&nbsp;return "less or equal";
            <br />
            {"}"}
          </pre>
        ),
      },
    ],
  },
];

const GuideCard = () => {
  return (
    <div className="flex flex-col backdrop-opacity-100">
      <Tabs defaultValue="syntax" className="w-xl">
        <TabsList className="w-xl flex ">
          <TabsTrigger value="syntax">Syntax</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        {content.map((card) => (
          <TabsContent
            value={card.value}
            key={card.value}
          >
            <Card className="w-full h-[500px] overflow-hidden">
              <div className="flex flex-col overflow-y-auto gap-3">
                <CardHeader>
                  <CardTitle>
                    {card.value.charAt(0).toUpperCase() + card.value.slice(1)}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {card.boxes.map((box) => (
                    <div
                      className="flex flex-col rounded-lg px-3 gap-1.5"
                      key={box.boxTitle}
                    >
                      <CardTitle>{box.boxTitle}</CardTitle>
                      {box.boxDescription && (
                        <CardDescription>{box.boxDescription}</CardDescription>
                      )}
                      {box.boxCode && <div className="pt-1">{box.boxCode}</div>}
                    </div>
                  ))}
                </CardContent>
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GuideCard;

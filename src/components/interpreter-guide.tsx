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
    description: "",
    boxes: [
      {
        boxTitle: "Variables",
        boxDesciption: <p>Declare variables with the <code>let</code> keyword.</p>,
        boxCode: "",
      },
    ],
  },
];

const GuideCard = () => {
  return (
    <div className="flex flex-col  backdrop-opacity-100 ">
      <Tabs defaultValue="syntax" className="">
        <TabsList>
          <TabsTrigger value="syntax">Syntax</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        {content.map((card) => (
          <TabsContent value={card.value}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>{card.value.charAt(0).toUpperCase() + card.value.slice(1)}</CardTitle>
                <CardDescription>How it works.</CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
    </div>
  );
};

export default GuideCard;

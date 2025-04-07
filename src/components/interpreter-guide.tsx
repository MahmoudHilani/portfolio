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
    title: "Syntax",
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
          <div>
            let x = 10;
            <br />
            let y = "hello";
            <br />
            let isTrue = true;
          </div>
        ),
      },
      {
        boxTitle: "Data Types",
        boxDescription: (
          <ul className="list-disc list-inside space-y-1">
            <li className="font-semibold">
              Integers:{" "}
              <code className="bg-muted px-1 font-normal rounded">
                5, 10, -20
              </code>
            </li>
            <li className="font-semibold">
              Strings:{" "}
              <code className="bg-muted px-1 font-normal rounded">
                "hello", "world"
              </code>
            </li>
            <li className="font-semibold">
              Booleans:{" "}
              <code className="bg-muted px-1 font-normal rounded">
                true, false
              </code>
            </li>
            <li className="font-semibold">
              Arrays:{" "}
              <code className="bg-muted px-1 font-normal rounded">
                [1, 2, 3]
              </code>
            </li>
            <li className="font-semibold">
              Hashes:{" "}
              <code className="bg-muted px-1 font-normal rounded">
                {"{"}"key": "value"{"}"}
              </code>
            </li>
            <li className="font-semibold">Functions: First-class functions</li>
            <li className="font-semibold">
              Null:{" "}
              <code className="bg-muted px-1 font-normal rounded">null</code>
            </li>
          </ul>
        ),
      },
      {
        boxTitle: "If Statements",
        boxCode: (
          <div>
            if (x {">"} 5) {"{"}
            <br />
            &nbsp;&nbsp;return "greater";
            <br />
            {"}"} else {"{"}
            <br />
            &nbsp;&nbsp;return "less or equal";
            <br />
            {"}"}
          </div>
        ),
      },
      {
        boxTitle: "Functions",
        boxCode: (
          <div>
            let add = fn(a, b) {"{"}
            <br />
            &nbsp;&nbsp;return a + b;
            <br />
            {"}"};<br />
            <br />
            add(5, 10); // Returns 15
          </div>
        ),
      },
    ],
  },
  {
    value: "functions",
    title: "Built-in Functions",
    description: "Functions to make your life easier.",
    boxes: [
      {
        boxTitle: "len(arg)",
        boxDescription: "Returns the length of a string or an array.",
        boxCode: (
          <div>
            len("hello"); // Returns 5 <br />
            len([1, 2, 3]) // Returns 3
          </div>
        ),
      },
      {
        boxTitle: "last(array)",
        boxDescription: "Returns the last element of an array.",
        boxCode: <div>first([1, 2, 3]) // Returns 3</div>,
      },
      {
        boxTitle: "first(array)",
        boxDescription: "Returns the first element of an array.",
        boxCode: <div>first([1, 2, 3]) // Returns 1</div>,
      },
      {
        boxTitle: "rest(array)",
        boxDescription:
          "Returns all elements of an array except the first (Useful for recursion).",
        boxCode: <div>first([1, 2, 3]) // Returns [2, 3]</div>,
      },
      {
        boxTitle: "push(array, element)",
        boxDescription: "Returns a new array with the element added.",
        boxCode: <div>push([1, 2], 3); // Returns [1, 2, 3]</div>,
      },
      {
        boxTitle: "puts(arg)",
        boxDescription: "Prints the argument to the console.",
        boxCode: <div>puts("Hello, world!"); // Outputs: Hello, world!</div>,
      },
    ],
  },
  {
    value: "examples",
    title: "Code Examples",
    description: "If you're feeling uninspired.",
    boxes: [
      {
        boxTitle: "Fibonacci Sequence",
        boxCode: (
          <div>
            let fibonacci = fn(n) {"{"} <br />
            &nbsp;&nbsp;if (n == 0) {"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;return 0;
            <br />
            &nbsp;&nbsp;{"}"} else {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (n == 1) {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return 1; <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} else {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return fibonacci(n - 1) +
            fibonacci(n - 2); <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} <br />
            &nbsp;&nbsp;{"}"} <br />
            {"}"}; fibonacci(10);
          </div>
        ),
      },
      {
        boxTitle: "Hash Usage",
        boxCode: (
          <div>
            let person = {"{"}"name": "John", "age": 30{"}"};<br />
            person["name"];
            <br />
            let getName = fn(p) {"{"} return p["name"]; {"}"};<br />
            getName(person);
          </div>
        ),
      },
      {
        boxTitle: "Closures",
        boxCode: (
          <div>
            let newAdder = fn(x) {"{"}
            <br />
            &nbsp;&nbsp;fn(y) {"{"} return x + y; {"}"}
            <br />
            {"}"};<br />
            <br />
            let addTwo = newAdder(2);
            <br />
            addTwo(5);
          </div>
        ),
      },
      {
        boxTitle: "Reduce and Sum",
        boxCode: (
          <div>
            let reduce = fn(arr, initial, f) {"{"} <br />
            &nbsp;&nbsp;let iter = fn(arr, result) {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (len(arr) == 0) {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} else {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iter(rest(arr), f(result,
            first(arr))); <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} <br />
            &nbsp;&nbsp;{"}"}; <br />
            &nbsp;&nbsp;iter(arr, initial); <br />
            {"}"}; <br />
            let sum = fn(arr) {"{"} <br />
            &nbsp;&nbsp;reduce(arr, 0, fn(initial, el) {"{"} initial + el {"}"}
            ); <br />
            {"}"}; <br />
            sum([1, 2, 3, 4, 5]);
          </div>
        ),
      },
      {
        boxTitle: "Map and double",
        boxCode: (
          <div>
            let map = fn(arr, f) {"{"} <br />
            &nbsp;&nbsp;let iter = fn(arr, accumulated) {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if (len(arr) == 0) {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accumulated <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} else {"{"} <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iter(rest(arr), push(accumulated, f(first(arr)))); <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{"}"} <br />
            &nbsp;&nbsp;{"}"}; iter(arr, []); <br />
            {"}"} <br />
            let a = [1, 2, 3, 4]; <br />
            let double = fn(x) {"{"} x * 2 {"}"}; <br />
            map(a, double); <br />
          </div>
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
          <TabsTrigger value="functions">Built-in Functions</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        {content.map((card) => (
          <TabsContent value={card.value} key={card.value}>
            <div className="w-full  overflow-hidden bg-background text-white  rounded-lg">
              <div className="flex h-[500px] flex-col overflow-auto p-8 gap-3">
                <div>
                  <div className="font-bold">{card.title}</div>
                  <div>{card.description}</div>
                </div>
                <div className="flex flex-col gap-4">
                  {card.boxes.map((box) => (
                    <div
                      className="flex flex-col rounded-lg px-3 gap-1 bg-background text-white"
                      key={box.boxTitle}
                    >
                      <div className="font-bold">{box.boxTitle}</div>
                      {box.boxDescription && <div>{box.boxDescription}</div>}
                      {box.boxCode && (
                        <pre className="bg-zinc-800 text-green-400 rounded-md overflow-hidden">
                          <div className="p-3 overflow-auto">{box.boxCode}</div>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default GuideCard;

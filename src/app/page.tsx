import { Button } from "@nextui-org/react";
import { GoSmiley } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <h1 className="text-red-600">Hello World</h1>
      <Button color="danger" variant="bordered" startContent={<GoSmiley />}>
        Click Me
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WebConnectPage() {
  return (
    <div className="size-full flex justify-center items-center">
      <Card className="w-100">
        <CardHeader>
          <CardTitle>Connect to Tiny Games</CardTitle>
          <CardDescription>
            Enter a username to connect to the Tiny Games app
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Connect
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

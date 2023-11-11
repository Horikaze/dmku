import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./AccountSettings";
import ImagesSettings from "./ImagesSettings";

export function Settings() {
  return (
    <Tabs defaultValue="account" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AccountSettings />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="images">
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>
            Make changes to your account here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ImagesSettings />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

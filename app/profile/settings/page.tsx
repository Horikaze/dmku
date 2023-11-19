import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "../components/Profile/components/AccountSettings";
import ImagesSettings from "../components/Profile/components/ImagesSettings";

export default function Settings() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="images">Images</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
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
              Make changes to your account images here.
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

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"

export const dynamic = 'force-dynamic';

async function getVenues() {
  try {
    return await db.venue.findMany({
      include: {
        manager: {
          select: { name: true, email: true, phone: true },
        },
        _count: {
          select: { inquiries: true, broadcastLogs: true }
          // TODO: Add favorites count back when venueFavorite model is implemented
          // favorites: true
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    return [];
  }
}

export default async function VenuesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const venues = await getVenues();
  const activeVenues = venues.filter(v => v.status === 'active');
  const draftVenues = venues.filter(v => v.status === 'draft');
  const expiredVenues = venues.filter(v => v.status === 'expired');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Venue Management</h1>
          <p className="text-muted-foreground">Manage all venues in the system</p>
        </div>
        <Button asChild>
          <a href="/dashboard/venues/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Venue
          </a>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({venues.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeVenues.length})</TabsTrigger>
          <TabsTrigger value="draft">Drafts ({draftVenues.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredVenues.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="pt-6">
              <DataTable columns={columns} data={venues as any} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardContent className="pt-6">
              <DataTable columns={columns} data={activeVenues as any} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardContent className="pt-6">
              <DataTable columns={columns} data={draftVenues as any} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired">
          <Card>
            <CardContent className="pt-6">
              <DataTable columns={columns} data={expiredVenues as any} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    label: string;
    value: number;
    icon?: React.ReactNode;
}

export function StatsCard({ label, value, icon }: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="text-3xl font-bold">{value}</p>
                    </div>
                    {icon && <div className="text-gray-400">{icon}</div>}
                </div>
            </CardContent>
        </Card>
    );
}

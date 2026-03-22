import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useProjects } from "@/hooks/usePortfolioData";
import { motion } from "framer-motion";

const ProjectDistribution = () => {
    const { data: projects } = useProjects();

    if (!projects) return null;

    // Group projects by category
    const distributionMap: Record<string, { name: string; value: number; color: string; icon: string }> = {
        "Web Development": { name: "Web Development", value: 0, color: "#10b981", icon: "🌐" },
        "App Development": { name: "App Development", value: 0, color: "#8b5cf6", icon: "📱" },
        "AI/ML": { name: "AI/ML", value: 0, color: "#f43f5e", icon: "🤖" },
    };

    projects.forEach((p) => {
        // Basic category heuristic
        const title = p.title.toLowerCase();
        const desc = p.description.toLowerCase();
        if (title.includes("web") || title.includes("site") || desc.includes("web") || desc.includes("react")) {
            distributionMap["Web Development"].value++;
        } else if (title.includes("app") || title.includes("mobile") || desc.includes("android") || desc.includes("ios")) {
            distributionMap["App Development"].value++;
        } else if (title.includes("ai") || title.includes("ml") || desc.includes("intelligence") || desc.includes("machine")) {
            distributionMap["AI/ML"].value++;
        } else {
            distributionMap["Web Development"].value++; // Default
        }
    });

    const data = Object.values(distributionMap).filter(v => v.value > 0);
    const total = projects.length;

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold">
                        Project <span className="text-gradient">Distribution</span>
                    </h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto card-glass rounded-2xl p-8 md:p-12 relative"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="h-[300px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-4xl font-bold">{total}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {data.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center px-4 py-3 rounded-xl border border-white/5 bg-white/5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-medium">{item.name}</span>
                                        </div>
                                        <span className="font-bold">{item.value}</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${(item.value / total) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-2">
                                        {((item.value / total) * 100).toFixed(1)}% of projects
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectDistribution;

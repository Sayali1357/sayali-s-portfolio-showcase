import { motion } from "framer-motion";
import { useRef } from "react";
import {
    Code2,
    Layout,
    Database,
    Cloud,
    BrainCircuit,
} from "lucide-react";

const expertiseData = [
    {
        id: "frontend",
        title: "Frontend",
        icon: Layout,
        color: "#38bdf8",
        skills: ["React", "Next.js", "Tailwind", "TypeScript"],
        position: { x: 20, y: 20 } // Top Left
    },
    {
        id: "backend",
        title: "Backend",
        icon: Database,
        color: "#10b981",
        skills: ["Node.js", "Express", "PostgreSQL"],
        position: { x: 80, y: 25 } // Top Right
    },
    {
        id: "data",
        title: "Data Analysis",
        icon: BrainCircuit,
        color: "#f43f5e",
        skills: ["MySQL", "Python", "Excel"],
        position: { x: 20, y: 70 } // Bottom Left
    },
    {
        id: "cloud",
        title: "Cloud",
        icon: Cloud,
        color: "#8b5cf6",
        skills: ["Vercel", "Firebase"],
        position: { x: 80, y: 75 } // Bottom Right
    }
];

const ExpertiseTree = () => {
    return (
        <section className="py-32 relative bg-slate-950/50 overflow-hidden min-h-[800px] flex items-center justify-center">
            {/* Decorative Blur Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative w-full max-w-6xl h-[600px]">
                {/* Section Header */}
                <div className="absolute -top-16 left-0 right-0 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Technical <span className="text-gradient">Ecosystem</span>
                    </motion.h2>
                </div>

                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        className="relative p-1 rounded-full bg-gradient-to-tr from-primary via-purple-500 to-pink-500 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
                    >
                        <div className="bg-slate-900 rounded-full w-32 h-32 flex flex-col items-center justify-center border border-white/10">
                            <Code2 className="w-8 h-8 text-white mb-1" />
                            <span className="text-white font-black text-xs tracking-widest uppercase">Stack</span>
                        </div>

                        {/* Spinning Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-15px] border border-dashed border-primary/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-30px] border border-dotted border-purple-500/20 rounded-full"
                        />
                    </motion.div>
                </div>

                {/* SVG Connections - Using percentages for responsive alignment */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {expertiseData.map((node) => (
                        <motion.line
                            key={`line-${node.id}`}
                            x1="50"
                            y1="50"
                            x2={node.position.x}
                            y2={node.position.y}
                            stroke={node.color}
                            strokeWidth="0.5"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.3 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    ))}
                </svg>

                {/* Dynamic Nodes */}
                {expertiseData.map((node, idx) => {
                    const Icon = node.icon;
                    const isRight = node.position.x > 50;

                    return (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.15 + 0.5 }}
                            className="absolute z-20"
                            style={isRight ? {
                                left: `${node.position.x}%`,
                                top: `${node.position.y}%`,
                                transform: 'translate(2rem, -50%)'
                            } : {
                                right: `${100 - node.position.x}%`,
                                top: `${node.position.y}%`,
                                transform: 'translate(-2rem, -50%)'
                            }}
                        >
                            <div className={`flex items-center gap-6 ${isRight ? 'flex-row' : 'flex-row-reverse'}`}>
                                {/* Node Card */}
                                <div className="glass-panel p-5 rounded-3xl border-white/5 hover:border-white/20 transition-all duration-300 min-w-[200px] shadow-2xl relative">
                                    {/* Visual Connector Dot */}
                                    <div
                                        className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full blur-[2px] ${isRight ? '-left-8' : '-right-8'}`}
                                        style={{ backgroundColor: node.color }}
                                    />

                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="p-2.5 rounded-xl shrink-0"
                                            style={{ backgroundColor: `${node.color}15`, color: node.color }}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-bold text-white text-lg tracking-tight">{node.title}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {node.skills.map(skill => (
                                            <span
                                                key={skill}
                                                className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-400"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default ExpertiseTree;

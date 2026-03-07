import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "KKW Institute of Engineering Technology and Research",
    years: "2023 - 2027",
  },
  {
    degree: "12th Grade",
    institution: "Loknete Vyankatrao Hirey College of Science, Commerce and Arts",
    years: "2021 - 2023",
  },
  {
    degree: "10th Grade",
    institution: "Shree Swaminarayan English Medium School",
    years: "2018 - 2021",
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">
          Education & Experience
        </h2>

        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="card-glass rounded-xl p-6 flex items-center gap-6 hover:glow-border transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-primary">{edu.degree}</h3>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                <p className="text-muted-foreground text-xs mt-1">{edu.years}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

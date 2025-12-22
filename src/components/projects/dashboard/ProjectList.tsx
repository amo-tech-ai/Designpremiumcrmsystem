import { Project } from './types';
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectList({ projects, onProjectClick }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map(project => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onClick={onProjectClick}
        />
      ))}
    </div>
  );
}

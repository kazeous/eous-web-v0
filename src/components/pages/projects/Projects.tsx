import {useEffect, useState} from "react";
import {useDocumentTitle} from "usehooks-ts";
import {Container} from "../../ui/Container.tsx";
import "./projects.css";

type GitHubRepository = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    archived: boolean;
    pushed_at: string;
    topics: string[];
};

const GITHUB_USERNAME = "kazeous";
const GITHUB_REPOSITORIES_URL =
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`;

const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572a5",
    Java: "#b07219",
    Kotlin: "#a97bff",
    "C#": "#178600",
    "C++": "#f34b7d",
    C: "#555555",
    Rust: "#dea584",
    Go: "#00add8",
    HTML: "#e34c26",
    CSS: "#663399",
    Vue: "#41b883",
};

function formatUpdatedDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}

function ProjectCard({project}: Readonly<{ project: GitHubRepository }>) {
    return <article className="project-card">
        <div className="project-card-heading">
            <div className="project-icon surface-container-high">
                <i>code</i>
            </div>
            <div>
                <h3>{project.name}</h3>
                {project.archived && <span className="chip small no-margin">Archived</span>}
            </div>
        </div>

        <p className="project-description">
            {project.description || "A code project by Kaze."}
        </p>

        {project.topics.length > 0 && <div className="project-topics">
            {project.topics.slice(0, 4).map(topic =>
                <span className="chip small no-margin" key={topic}>{topic}</span>
            )}
        </div>}

        <div className="project-card-footer">
            <div className="project-meta">
                {project.language && <span>
                    <span
                        className="language-dot"
                        style={{backgroundColor: languageColors[project.language] ?? "var(--primary)"}}
                    />
                    {project.language}
                </span>}
                {project.stargazers_count > 0 && <span><i>star</i>{project.stargazers_count}</span>}
                {project.forks_count > 0 && <span><i>fork_right</i>{project.forks_count}</span>}
            </div>

            <div className="project-actions">
                {project.homepage && <a
                    className="project-link"
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} website`}
                >
                    <i>open_in_new</i>
                </a>}
                <a
                    className="project-link"
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} on GitHub`}
                >
                    <i>arrow_forward</i>
                </a>
            </div>
        </div>

        <small className="project-updated">
            Updated {formatUpdatedDate(project.pushed_at)}
        </small>
    </article>;
}

function ProjectSkeleton() {
    return <article className="project-card project-skeleton" aria-hidden="true">
        <div className="skeleton-line skeleton-title"/>
        <div className="skeleton-line"/>
        <div className="skeleton-line skeleton-short"/>
    </article>;
}

export function Projects() {
    useDocumentTitle("Projects - kazeous.com");
    const [projects, setProjects] = useState<GitHubRepository[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadProjects() {
            try {
                const response = await fetch(GITHUB_REPOSITORIES_URL, {
                    signal: controller.signal,
                    headers: {Accept: "application/vnd.github+json"},
                });

                if (!response.ok) {
                    throw new Error(`GitHub returned ${response.status}`);
                }

                const repositories = await response.json() as GitHubRepository[];
                setProjects(repositories.filter(repository => !repository.fork));
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    setHasError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        void loadProjects();
        return () => controller.abort();
    }, []);

    return <Container className="projects-page fade">
        <header className="projects-header">
            <div>
                <span className="projects-eyebrow">Things I build</span>
                <h1 className="primary-text">Projects</h1>
                <p>Code experiments, tools, and other things I have been tinkering with.</p>
            </div>
            <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button border round"
            >
                <i>code</i>
                <span>GitHub</span>
            </a>
        </header>

        {hasError && <article className="projects-empty center-align">
            <i className="extra">cloud_off</i>
            <h3>Could not load the projects right now.</h3>
            <p>You can still find all of them on GitHub.</p>
            <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="button primary round"
            >
                View repositories
            </a>
        </article>}

        {!hasError && <div className="projects-grid">
            {isLoading
                ? Array.from({length: 6}, (_, index) => <ProjectSkeleton key={index}/>)
                : projects.map(project => <ProjectCard project={project} key={project.id}/>)}
        </div>}

        {!isLoading && !hasError && projects.length === 0 && <article className="projects-empty center-align">
            <i className="extra">inventory_2</i>
            <h3>No public projects yet.</h3>
        </article>}
    </Container>;
}

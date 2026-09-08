import { projects } from "@/data/projects";

export const featuredProjects =
    projects.filter(project => project.featured);

export function getProject(slug:string){

    return projects.find(project=>project.slug===slug);

}

export function getProjectsByCategory(category:string){

    return projects.filter(project=>project.category===category);

}

export function getCategories(){

    const categories=[
        "industrial",
        "office",
        "villa",
        "residential",
    ];

    return categories.map(category=>{

        const items=getProjectsByCategory(category);

        return{

            id:category,

            title:
                category.charAt(0).toUpperCase()+
                category.slice(1),

            count:items.length,

            hero:items[0]?.hero,

        };

    });

}
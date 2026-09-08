import { projects } from "@/data/projects";

export function getCategories(){

return [

{

id:"industrial",

title:"Industrial",

count:

projects.filter(

p=>p.category==="industrial"

).length,

hero:

projects.find(

p=>p.category==="industrial"

)?.hero,

},

{

id:"office",

title:"Office",

count:

projects.filter(

p=>p.category==="office"

).length,

hero:

projects.find(

p=>p.category==="office"

)?.hero,

},

{

id:"villa",

title:"Villa",

count:

projects.filter(

p=>p.category==="villa"

).length,

hero:

projects.find(

p=>p.category==="villa"

)?.hero,

},

{

id:"residential",

title:"Residential",

count:

projects.filter(

p=>p.category==="residential"

).length,

hero:

projects.find(

p=>p.category==="residential"

)?.hero,

},

];

}
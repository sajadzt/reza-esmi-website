import styles from "./Heading.module.scss";

type Props = {

eyebrow?:string;

title:string;

text?:string;

};

export default function Heading({

eyebrow,

title,

text,

}:Props){

return(

<header className={styles.heading}>

{eyebrow&&<span>{eyebrow}</span>}

<h2>{title}</h2>

{text&&<p>{text}</p>}

</header>

);

}
"use client";

import styles from "./Stat.module.scss";

type Props = {

number:string;

title:string;

};

export default function Stat({

number,

title,

}:Props){

return(

<div className={styles.stat}>

<h3>{number}</h3>

<p>{title}</p>

</div>

);

}
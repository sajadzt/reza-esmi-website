"use client";

import styles from "./Manifesto.module.scss";
import useReveal from "@/hooks/useReveal";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";



export default function Manifesto(){


const reveal = useReveal();


return(

<Section>


<Container>


<div 
ref={reveal}
className={styles.wrapper}
>


<span className={styles.label}>
Philosophy
</span>



<h2>

Building Beyond Concrete.

</h2>



<p>

We design industrial and working environments
where architecture improves productivity,
human experience and long-term value.

</p>



</div>


</Container>


</Section>


);


}
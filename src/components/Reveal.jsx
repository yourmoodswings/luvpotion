import {motion,useReducedMotion} from 'framer-motion';

// Reveal once, without making reading or navigation depend on animation.
export default function Reveal({children,...props}){
 const reduced=useReducedMotion();
 return <motion.section {...props} initial={{opacity:1,y:0}} whileInView={reduced?{}:{y:[18,0],opacity:[.65,1]}} viewport={{once:true,amount:.12}} transition={{duration:.65,ease:[.22,1,.36,1]}}>{children}</motion.section>;
}

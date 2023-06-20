import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>SKILLS I HAVE ACQUIRED</p>
        <h2 className={styles.sectionHeadText}>Tools And Tecnologies.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 mb-14 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I possess experience working with a diverse range of tools and technologies, enabling me to consistently deliver high-quality solutions while adapting to meet project requirements.
      </motion.p>

      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technologie) => (
          <div className="w-28 h-28" key={technologie.name}>
            <BallCanvas icon={technologie.icon} name={technologie.name} />
          </div>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Tech, "");
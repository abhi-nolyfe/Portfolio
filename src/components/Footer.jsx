import { styles } from '../styles';
import { footerLinks} from '../constants';

const Footer = () => {
  return (
    <footer
        className={`${styles.paddingX} w-full flex items-center justify-center py-5 top-0 z-20 bg-primary gap-5`} 
    >
      {footerLinks.map((link, index) => (
        <a 
          key={index} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-8 h-8  flex justify-center items-center cursor-pointer hover:scale-110"
        >
          <img 
            src={link.icon}
            title={link.title}
            alt="Link Icon"
          />
        </a>
      ))}
    </footer>
  )
}

export default Footer;
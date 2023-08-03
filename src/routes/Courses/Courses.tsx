import './index.css';
import exImg from '../../../public/assets/benefitsUni.jpg';
import dukeImg from '../../../public/assets/DUKE.png';
import CourseCard from './CourseCard';
import { Navbar } from '@routes/LandingPage/Navbar/Navbar';

const Courses = () => {
  return (
    <main>
      <Navbar />
      <h1 className='course-title-1'>Our Courses</h1>
      <section className='course-catalogue'>
        <CourseCard title="How to fill Common App" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='/app/quiz' />
        
        

      </section>
    </main>
  )
}

export default Courses
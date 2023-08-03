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
        <CourseCard title="How to fill Common App" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="About College Applications in USA" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="How to ace your SATs and IELTS exams" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="Advanced English for Academic IELTS" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="How to ace your SATs and IELTS exams" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="Advanced English for Academic IELTS" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="How to ace your SATs and IELTS exams" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="Advanced English for Academic IELTS" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="How to ace your SATs and IELTS exams" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        <CourseCard title="Advanced English for Academic IELTS" img={exImg} owner="Duke University" ownerImg={dukeImg} courseLink='https://www.coursera.org/learn/build-ai-apps-with-chatgpt-dalle-gpt4' />
        

      </section>
    </main>
  )
}

export default Courses
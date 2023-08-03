type CourseCardProps = {
    title: string,
    img: string,
    owner: string,
    ownerImg: string,
    courseLink: string
}

const CourseCard = ({owner, img, title, ownerImg, courseLink}: CourseCardProps) => {
return (
    <div className='course-card' onClick={() => window.location.replace(courseLink)}>
        <img src={img} className='course-img' alt="course img" />
        <div className="owner">
            <img src={ownerImg} className="owner-img" />
            <h1 className='course-title'>{owner}</h1>
        </div>
        <p className='course-description'>
            {title}
        </p>
        <p className="course-description descr-course">Course</p>
    </div>
)
}

export default CourseCard
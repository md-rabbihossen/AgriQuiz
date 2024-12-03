import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const courses = [
    { id: 1, name: "ABOT" },
    { id: 2, name: "AGRO" },
    { id: 3, name: "SOIL" },
    { id: 4, name: "AFES" },
    { id: 5, name: "ENTO" },
    { id: 6, name: "HORT(ELECTIVE)" },
    { id: 7, name: "RESOURCES(PDF)", path: "/resources" },
  ];

  const handleClick = (course) => {
    if (course.path) {
      navigate(course.path);
    } else {
      navigate(`/course/${course.name.toLowerCase()}`);
    }
  };

  return (
    <section className="hero">
      <h2>Our Courses (L-2 S-2)</h2>
      <div className="course-list">
        {courses.map((course) => (
          <button
            key={course.id}
            className="course-button"
            onClick={() => handleClick(course)}
          >
            {course.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Hero;

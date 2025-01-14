const buttons = document.querySelectorAll('.button')
const courses_by_filter = document.getElementById('courses-by-filter');
const credits = document.getElementById('credits')

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const types = ['All', 'CSE', 'WDD'];

document.addEventListener('DOMContentLoaded', () => {
    courses.forEach (element => {
        const course = document.createElement('h2');
        course.textContent = element.subject + element.number;
        course.classList.add('course', 'show');
        if (element.completed == true) {
            course.classList.add('completed')
        }
        courses_by_filter.appendChild(course)
        console.log('test')
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const course = document.querySelectorAll('.course')

    const shown_courses = document.querySelectorAll('.show')
    console.log(shown_courses)
    const filtered_array = []
    shown_courses.forEach(element => {
        const item = courses.filter((item) => element.textContent.includes(item.subject + item.number))
        filtered_array.push(item[0])
    })

    credits.textContent = filtered_array.reduce((total, item) => {return total + item.credits}, 0)

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('All')) {
                course.forEach(item => {
                    item.classList.add('show')
                })
            } else {
                course.forEach(item => {
                    if (item.textContent.includes(button.textContent)) {
                        item.classList.add('show')
                    } else {
                        item.classList.remove('show')
                    }
                })
            }

            const shown_courses = document.querySelectorAll('.show')
            console.log(shown_courses)
            const filtered_array = []
            shown_courses.forEach(element => {
                const item = courses.filter((item) => element.textContent.includes(item.subject + item.number))
                filtered_array.push(item[0])
            })

            console.log(filtered_array)
            
         
            // console.log(filtered_array.reduce((total, item) => {return total + item.credits}, 0))
            credits.textContent = filtered_array.reduce((total, item) => {return total + item.credits}, 0)
        })
    })
})

                         
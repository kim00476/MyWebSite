// Get references to the elements
const submit = document.getElementById("submit"); // Submit button
const filterSelect = document.querySelector('#filter-F'); // Filter select element
const sortSelect = document.querySelector('select[name="sort"]'); // Sort select element
const courseContainer = document.getElementById('courseContainer'); // Container for course elements

// Add event listener to the form for search functionality
submit.addEventListener("click", function() {
  const query = document.getElementById('input-box').value.toLowerCase();  // Get search query
  searchCourses(query);
})

// Add event listener to the filter select for filtering courses
filterSelect.addEventListener('change', function() {
  const selectedLevel = filterSelect.value.toLowerCase(); // Get the selected level from the filter select
  console.log(filterSelect);  
  filterCourses(selectedLevel);  // Call the filterCourses function with the selected level
});

// Add event listener to the sort select for sorting courses
sortSelect.addEventListener('change', function() {
  const selectedSort = sortSelect.value;  // Get the selected sorting option from the sort select
  sortCourses(selectedSort);  // Call the sortCourses function with the selected sorting option
});

// Function to search courses based on the query
function searchCourses(query) {
  const courses = Array.from(courseContainer.getElementsByClassName('about-col')); // Get all course elements
  const selectedLevel = filterSelect.value.toLowerCase(); // Get the currently selected level from the filter select

  courses.forEach(course => {
    const title = course.getElementsByTagName('h3')[0].textContent.toLowerCase(); // Get the course title
    const level = course.getElementsByTagName('span')[0].textContent.toLowerCase(); // Get the course level
    
    if ((title.includes(query) || level.includes(query)) && (level === selectedLevel || selectedLevel === "all")) {
      course.style.display = 'block'; // Show the course if it matches the query and the selected level or if all levels are selected
    } else {
      course.style.display = 'none'; // Hide the course if it doesn't match the query or the selected level
    }
  });
}

// Function to filter courses based on the selected level
function filterCourses(level) {
  const courses = Array.from(courseContainer.getElementsByClassName('about-col')); // Get all course elements
  
  courses.forEach(course => {
    const courseLevel = course.getElementsByTagName('span')[0].textContent.toLowerCase(); // Get the course level
    
    if (level === 'all') {
      course.style.display = 'block'; // Show all courses if "all" is selected
    } else {
      if(level === courseLevel){
        course.style.display = 'block'; // Show the course if it matches the selected level
      } else {
      course.style.display = 'none'; // Hide the course if it doesn't match the selected level
      }
    }
  });
}

// Function to sort courses based on the selected option
function sortCourses(option) {
  const courses = Array.from(courseContainer.getElementsByClassName('about-col'));  // Get all course elements
  
  courses.sort(function(a, b) {
    const levelA = a.getElementsByTagName('span')[0].textContent.toLowerCase(); // Get the course level for course A
    const levelB = b.getElementsByTagName('span')[0].textContent.toLowerCase(); // Get the course level for course B
    
    if (option === 'asc') {
      return levelA.localeCompare(levelB); // Sort in ascending order based on the course level
    } else if (option === 'desc') {
      return levelB.localeCompare(levelA); // Sort in descending order based on the course level
    }
  });
  
  courses.forEach(course => {
    courseContainer.appendChild(course); // Append the sorted courses back to the container in the new order
  });
}



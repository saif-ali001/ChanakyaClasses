// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 JavaScript loaded successfully!');
  initializeApp();
});
// Initialize Application
function initializeApp() {
  setupEventListeners();
  displayWelcomeMessage();
  loadStudents();
}
// Event Listeners Setup
function setupEventListeners() {
  // Welcome page Next button - Navigate to students page
  const welcomeNextBtn = document.getElementById('welcomeNextBtn');
  if (welcomeNextBtn) {
    welcomeNextBtn.addEventListener('click', function() {
      navigateToStudents();
    });
  }

  // Back button - Navigate to welcome page
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      navigateToWelcome();
    });
  }
  // Back to students button - Navigate from profile to students
  const backToStudentsBtn = document.getElementById('backToStudentsBtn');
  if (backToStudentsBtn) {
    backToStudentsBtn.addEventListener('click', function() {
      navigateFromProfileToStudents();
    });
  }
  // Toggle add form button
  const toggleAddForm = document.getElementById('toggleAddForm');
  if (toggleAddForm) {
    toggleAddForm.addEventListener('click', function() {
      toggleAddStudentForm();
    });
  }
  // Add student button
  const addStudentBtn = document.getElementById('addStudentBtn');
  if (addStudentBtn) {
    addStudentBtn.addEventListener('click', function() {
      addNewStudent();
    });
  }
  // Enter key for forms
  const inputs = document.querySelectorAll('#studentName, #fatherName, #studentClass, #studentSubject, #studentMedium, #studentGender, #studentMobile');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addNewStudent();
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      handleSearch(this.value);
    });

    searchInput.addEventListener('focus', function() {
      if (this.value.trim()) {
        handleSearch(this.value);
      }
    });

    // Clear search when clicking outside
    document.addEventListener('click', function(e) {
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(e.target)) {
        hideSearchResults();
      }
    });

    // Handle keyboard navigation in search results
    searchInput.addEventListener('keydown', function(e) {
      const dropdown = document.getElementById('searchResults');
      const items = dropdown.querySelectorAll('.search-result-item');
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateSearchResults(e.key === 'ArrowDown' ? 1 : -1, items);
      } else if (e.key === 'Enter') {
        const selected = dropdown.querySelector('.search-result-item.selected');
        if (selected) {
          e.preventDefault();
          selected.click();
        }
      } else if (e.key === 'Escape') {
        hideSearchResults();
        this.blur();
      }
    });
  }
}
// Display Welcome Message
function displayWelcomeMessage() {
  const currentTime = new Date().getHours();
  let greeting;

  if (currentTime < 12) {
    greeting = 'Good Morning! 🌅';
  } else if (currentTime < 17) {
    greeting = 'Good Afternoon! ☀️';
  } else {
    greeting = 'Good Evening! 🌙';
  }

  console.log(`${greeting} Welcome to your web application!`);
}
// Navigation Functions
function navigateToStudents() {
  const welcomePage = document.getElementById('welcomePage');
  const studentsPage = document.getElementById('studentsPage');

  if (welcomePage && studentsPage) {
    // Add transition effect
    welcomePage.style.opacity = '0';
    welcomePage.style.transform = 'translateX(-100px)';

    setTimeout(() => {
      welcomePage.style.display = 'none';
      studentsPage.style.display = 'block';
      studentsPage.style.opacity = '0';
      studentsPage.style.transform = 'translateX(100px)';

      // Animate in
      setTimeout(() => {
        studentsPage.style.transition = 'all 0.5s ease';
        studentsPage.style.opacity = '1';
        studentsPage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    showAlert('Students page loaded! 👨‍🎓', 'success');
  }
}
function navigateToWelcome() {
  const welcomePage = document.getElementById('welcomePage');
  const studentsPage = document.getElementById('studentsPage');

  if (welcomePage && studentsPage) {
    // Add transition effect
    studentsPage.style.opacity = '0';
    studentsPage.style.transform = 'translateX(100px)';

    setTimeout(() => {
      studentsPage.style.display = 'none';
      welcomePage.style.display = 'flex';
      welcomePage.style.opacity = '0';
      welcomePage.style.transform = 'translateX(-100px)';

      // Animate in
      setTimeout(() => {
        welcomePage.style.transition = 'all 0.5s ease';
        welcomePage.style.opacity = '1';
        welcomePage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    showAlert('Welcome back! 🎉', 'info');
  }
}
// Students Data Management
let studentsData = [
  {
    id: 1,
    name: 'Rahul Kumar',
    fatherName: 'Suresh Kumar',
    class: '10th',
    subject: 'Physics',
    medium: 'Hindi',
    gender: 'Male',
    mobile: '9876543210',
    address: 'Patna, Bihar',
    fees: 5000,
    feesPaid: true,
    joinDate: '2024-01-15',
    lastFeePaidDate: '2024-02-15',
    leavingDate: null,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    fatherName: 'Rajesh Sharma',
    class: '12th',
    subject: 'Chemistry',
    medium: 'English',
    gender: 'Female',
    mobile: '8765432109',
    address: 'Delhi',
    fees: 7000,
    feesPaid: false,
    joinDate: '2024-02-01',
    lastFeePaidDate: null,
    leavingDate: null,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Amit Singh',
    fatherName: 'Vinod Singh',
    class: '9th',
    subject: 'Maths',
    medium: 'Hindi',
    gender: 'Male',
    mobile: '7654321098',
    address: 'Muzaffarpur, Bihar',
    fees: 4500,
    feesPaid: true,
    joinDate: '2024-01-10',
    lastFeePaidDate: '2024-02-10',
    leavingDate: null,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    fatherName: 'Mohan Gupta',
    class: '11th',
    subject: 'Biology',
    medium: 'English',
    gender: 'Female',
    mobile: '6543210987',
    address: 'Gaya, Bihar',
    fees: 6000,
    feesPaid: false,
    joinDate: '2024-02-15',
    lastFeePaidDate: null,
    leavingDate: null,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Vikash Yadav',
    fatherName: 'Ram Yadav',
    class: '10th',
    subject: 'English',
    medium: 'Hindi',
    gender: 'Male',
    mobile: '5432109876',
    address: 'Darbhanga, Bihar',
    fees: 5500,
    feesPaid: true,
    joinDate: '2024-01-20',
    lastFeePaidDate: '2024-02-20',
    leavingDate: null,
    status: 'Active'
  }
];
// Load Students with Grouping
function loadStudents() {
  const studentsList = document.getElementById('studentsList');
  if (!studentsList) return;

  studentsList.innerHTML = '';

  // Separate active and left students
  const activeStudents = studentsData.filter(student => student.status === 'Active');
  const leftStudents = studentsData.filter(student => student.status === 'Left');

  // Group active students by class and medium
  const groupedActiveStudents = groupStudentsByClassAndMedium(activeStudents);

  // Display active students groups
  Object.keys(groupedActiveStudents).forEach(groupKey => {
    const students = groupedActiveStudents[groupKey];
    if (students.length > 0) {
      // Better group ID generation - consistent with header
      const groupId = groupKey.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

      // Create group header
      const groupHeader = createGroupHeader(groupKey, students.length);
      studentsList.appendChild(groupHeader);

      // Create group container for students (initially hidden)
      const groupContainer = document.createElement('div');
      groupContainer.className = 'group-students-container';
      groupContainer.id = `group-${groupId}`;
      groupContainer.style.display = 'none';

      // Create student cards for this group
      const studentsRow = document.createElement('div');
      studentsRow.className = 'row';
      students.forEach(student => {
        const studentCard = createStudentCard(student);
        studentsRow.appendChild(studentCard);
      });

      groupContainer.appendChild(studentsRow);
      studentsList.appendChild(groupContainer);
    }
  });

  // Add left students group if any
  if (leftStudents.length > 0) {
    const leftGroupKey = "Left Students";
    const leftGroupId = "leftstudents";

    // Create left students group header
    const leftGroupHeader = createLeftStudentsGroupHeader(leftStudents.length);
    studentsList.appendChild(leftGroupHeader);

    // Create group container for left students (initially hidden)
    const leftGroupContainer = document.createElement('div');
    leftGroupContainer.className = 'group-students-container';
    leftGroupContainer.id = `group-${leftGroupId}`;
    leftGroupContainer.style.display = 'none';

    // Create student cards for left students
    const leftStudentsRow = document.createElement('div');
    leftStudentsRow.className = 'row';
    leftStudents.forEach(student => {
      const studentCard = createStudentCard(student);
      leftStudentsRow.appendChild(studentCard);
    });

    leftGroupContainer.appendChild(leftStudentsRow);
    studentsList.appendChild(leftGroupContainer);
  }

  console.log(`${studentsData.length} students loaded successfully!`);

  // Update notification badge after loading
  setTimeout(() => updateNotificationBadge(), 100);
}

// Group Students by Class, Subject, Medium and Gender
function groupStudentsByClassAndMedium(students) {
  const groups = {};

  students.forEach(student => {
    const groupKey = `${student.class} - ${student.subject} - ${student.medium} - ${student.gender || 'Unknown'}`;
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(student);
  });

  // Sort groups by class order, then by subject, then by medium, then by gender
  const sortedGroups = {};
  const classOrder = ['9th', '10th', '11th', '12th', 'Graduation'];
  const subjectOrder = ['Physics', 'Chemistry', 'Maths', 'Biology', 'English', 'Polytechnic', 'Other'];
  const mediumOrder = ['Hindi', 'English'];
  const genderOrder = ['Male', 'Female', 'Other'];

  classOrder.forEach(className => {
    subjectOrder.forEach(subject => {
      mediumOrder.forEach(medium => {
        genderOrder.forEach(gender => {
          const key = `${className} - ${subject} - ${medium} - ${gender}`;
          if (groups[key]) {
            sortedGroups[key] = groups[key];
          }
        });
      });
    });
  });

  // Add any remaining groups that weren't in the predefined order
  Object.keys(groups).forEach(key => {
    if (!sortedGroups[key]) {
      sortedGroups[key] = groups[key];
    }
  });

  return sortedGroups;
}

// Create Group Header
function createGroupHeader(groupName, studentCount) {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'col-12 group-header mb-3';

  const [className, subject, medium, gender] = groupName.split(' - ');
  const classIcon = getClassIcon(className);
  const subjectIcon = getSubjectIcon(subject);
  const mediumIcon = medium === 'Hindi' ? '🇮🇳' : '🇬🇧';
  const genderIcon = getGenderIcon(gender);
  // Better group ID generation - remove spaces, special chars and make it unique
  const groupId = groupName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  headerDiv.innerHTML = `
<div class="group-header-card clickable" onclick="toggleGroupStudents('${groupId}')">
<div class="group-header-content">
<div class="group-header-left">
<div class="group-icon">${classIcon}</div>
<div class="group-info">
<h4 class="group-title">Class ${className} - ${subject} - ${medium} - ${gender}</h4>
<p class="group-subtitle">${studentCount} Student${studentCount > 1 ? 's' : ''} ${subjectIcon} ${mediumIcon} ${genderIcon}</p>
</div>
</div>
<div class="group-header-right">
<div class="expand-arrow" id="arrow-${groupId}" onclick="event.stopPropagation(); toggleGroupStudents('${groupId}')">
<i class="arrow-down">▼</i>
</div>
<div class="student-count-badge">${studentCount}</div>
</div>
</div>
</div>
`;

  return headerDiv;
}

// Get Class Icon
function getClassIcon(className) {
  const icons = {
    '9th': '📖',
    '10th': '📚',
    '11th': '📝',
    '12th': '🎓',
    'Graduation': '🏆'
  };
  return icons[className] || '📋';
}

// Get Subject Icon
function getSubjectIcon(subject) {
  const icons = {
    'Physics': '⚡',
    'Chemistry': '🧪',
    'Maths': '🔢',
    'Biology': '🧬',
    'English': '📝',
    'Polytechnic': '⚙️',
    'Other': '📚'
  };
  return icons[subject] || '📚';
}

// Get Gender Icon
function getGenderIcon(gender) {
  const icons = {
    'Male': '👨',
    'Female': '👩',
    'Other': '⚧️'
  };
  return icons[gender] || '👤';
}

// Create Left Students Group Header
function createLeftStudentsGroupHeader(studentCount) {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'col-12 group-header mb-3';

  const groupId = "leftstudents";

  headerDiv.innerHTML = `
<div class="group-header-card left-students-header clickable" onclick="toggleGroupStudents('${groupId}')">
<div class="group-header-content">
<div class="group-header-left">
<div class="group-icon">🚪</div>
<div class="group-info">
<h4 class="group-title">Left Students</h4>
<p class="group-subtitle">${studentCount} Student${studentCount > 1 ? 's' : ''} who have left 📤</p>
</div>
</div>
<div class="group-header-right">
<div class="expand-arrow" id="arrow-${groupId}" onclick="event.stopPropagation(); toggleGroupStudents('${groupId}')">
<i class="arrow-down">▼</i>
</div>
<div class="student-count-badge">${studentCount}</div>
</div>
</div>
</div>
`;

  return headerDiv;
}

// Toggle Group Students Visibility
function toggleGroupStudents(groupId) {
  console.log('Toggling group:', groupId); // Debug log
  const groupContainer = document.getElementById(`group-${groupId}`);
  const arrow = document.getElementById(`arrow-${groupId}`);

  console.log('Group container found:', !!groupContainer); // Debug log
  console.log('Arrow found:', !!arrow); // Debug log

  if (!groupContainer) {
    console.error(`Group container not found: group-${groupId}`);
    return;
  }
  if (!arrow) {
    console.error(`Arrow not found: arrow-${groupId}`);
    return;
  }

  if (groupContainer.style.display === 'none' || groupContainer.style.display === '') {
    // Show students
    console.log('Showing students for group:', groupId);
    groupContainer.style.display = 'block';
    groupContainer.style.opacity = '0';
    groupContainer.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      groupContainer.style.transition = 'all 0.3s ease';
      groupContainer.style.opacity = '1';
      groupContainer.style.transform = 'translateY(0)';
    }, 10);

    arrow.innerHTML = '<i class="arrow-up">▲</i>';
    arrow.classList.add('expanded');
    showAlert(`Group expanded! 📂`, 'info');
  } else {
    // Hide students
    console.log('Hiding students for group:', groupId);
    groupContainer.style.opacity = '0';
    groupContainer.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      groupContainer.style.display = 'none';
    }, 300);

    arrow.innerHTML = '<i class="arrow-down">▼</i>';
    arrow.classList.remove('expanded');
    showAlert(`Group collapsed! 📁`, 'info');
  }
}

// Get Pending Fees Students (Check all months from joining date)
function getPendingFeesStudents() {
  const currentDate = new Date();

  return studentsData.filter(student => {
    if (student.status !== 'Active') return false;

    // Initialize fees history if not exists
    if (!student.feesHistory) {
      student.feesHistory = {};
    }

    // Check if any month's fees are unpaid from joining date to current month
    const joinDate = new Date(student.joinDate);
    let checkMonth = new Date(joinDate);
    let hasPendingFees = false;

    while (checkMonth <= currentDate) {
      const monthKey = `${checkMonth.getFullYear()}-${String(checkMonth.getMonth() + 1).padStart(2, '0')}`;
      if (!student.feesHistory[monthKey] || student.feesHistory[monthKey] !== true) {
        hasPendingFees = true;
        break; // Found unpaid month, no need to check further
      }
      checkMonth.setMonth(checkMonth.getMonth() + 1);
    }

    return hasPendingFees;
  });
}

// Show Notifications
function showNotifications() {
  const pendingStudents = getPendingFeesStudents();

  if (pendingStudents.length === 0) {
    showAlert('🎉 All fees are paid! No pending notifications.', 'success');
    return;
  }

  const notificationModal = createNotificationModal(pendingStudents);
  document.body.appendChild(notificationModal);

  // Show modal with animation
  const modal = document.getElementById('notificationModal');
  modal.style.display = 'block';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.querySelector('.notification-content').style.transform = 'translateY(0)';
  }, 10);
}

// Create Notification Modal
function createNotificationModal(pendingStudents) {
  const modalDiv = document.createElement('div');
  modalDiv.id = 'notificationModal';
  modalDiv.className = 'notification-modal';
  modalDiv.style.cssText = `
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.5);
z-index: 10000;
display: none;
opacity: 0;
transition: opacity 0.3s ease;
`;

  const pendingList = pendingStudents.map(student => `
<div class="pending-student-item">
<div class="pending-student-info">
<div class="pending-avatar">${student.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
<div class="pending-details">
<button class="student-name-btn" onclick="openStudentProfileFromNotification(${student.id})">${student.name}</button>
<p>📚 Class: ${student.class} | 📖 ${student.subject || 'N/A'}</p>
<p>🗣️ Medium: ${student.medium} | ⚥ ${student.gender || 'N/A'}</p>
<p>📱 Mobile: ${student.mobile || 'Not provided'}</p>
<p class="pending-amount">₹${student.fees} pending</p>
</div>
</div>
<button class="btn btn-sm btn-success" onclick="quickPayFee(${student.id})">
💳 Mark Paid
</button>
</div>
`).join('');

  modalDiv.innerHTML = `
<div class="notification-content" style="
background: white;
border-radius: 20px;
max-width: 600px;
width: 90%;
max-height: 80vh;
overflow-y: auto;
margin: 5% auto;
transform: translateY(-30px);
transition: transform 0.3s ease;
box-shadow: 0 20px 40px rgba(0,0,0,0.2);
">
<div class="notification-header" style="
background: linear-gradient(135deg, #ff6b6b, #feca57);
color: white;
padding: 1.5rem;
border-radius: 20px 20px 0 0;
display: flex;
justify-content: space-between;
align-items: center;
">
<div>
<h4 style="margin: 0;">🔔 Pending Fees Notifications</h4>
<p style="margin: 0; opacity: 0.9;">${pendingStudents.length} student${pendingStudents.length > 1 ? 's' : ''} with pending fees</p>
</div>
<button onclick="closeNotificationModal()" style="
background: rgba(255,255,255,0.2);
border: none;
color: white;
width: 40px;
height: 40px;
border-radius: 50%;
font-size: 1.2rem;
cursor: pointer;
transition: background 0.3s ease;
">×</button>
</div>
<div class="notification-body" style="padding: 1.5rem;">
${pendingList}
</div>
</div>
`;

  return modalDiv;
}

// Close Notification Modal
function closeNotificationModal() {
  const modal = document.getElementById('notificationModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Open Student Profile from Notification
function openStudentProfileFromNotification(studentId) {
  // Close the notification modal first
  closeNotificationModal();
  
  // Open the student profile
  setTimeout(() => {
    viewProfile(studentId);
  }, 300);
}

// Quick Pay Fee Function
function quickPayFee(studentId) {
  const student = studentsData.find(s => s.id === studentId);
  if (!student) return;

  // Mark current fees as paid
  student.feesPaid = true;
  student.lastFeePaidDate = new Date().toISOString().split('T')[0];

  // Initialize fees history if not exists
  if (!student.feesHistory) {
    student.feesHistory = {};
  }

  // Mark all pending fees from joining date to current date as paid
  const joinDate = new Date(student.joinDate);
  const currentDate = new Date();
  let currentMonth = new Date(joinDate);

  while (currentMonth <= currentDate) {
    const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    // Mark this month as paid if it wasn't already
    if (!student.feesHistory[monthKey]) {
      student.feesHistory[monthKey] = true;
    }
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  // Save to localStorage
  saveToLocalStorage('studentsData', studentsData);

  // Reload students
  loadStudents();

  // Update notification badge
  updateNotificationBadge();

  showAlert(`${student.name}'s all pending fees marked as paid! 💳✅`, 'success');

  // Close modal if no more pending fees
  const pendingStudents = getPendingFeesStudents();
  if (pendingStudents.length === 0) {
    closeNotificationModal();
    showAlert('🎉 All fees are now paid!', 'success');
  } else {
    // Refresh the modal content
    closeNotificationModal();
    setTimeout(() => showNotifications(), 300);
  }
}

// Update Notification Badge
function updateNotificationBadge() {
  const badge = document.getElementById('notificationBadge');
  const pendingCount = getPendingFeesStudents().length;

  console.log('Updating notification badge - Pending count:', pendingCount);

  if (badge) {
    if (pendingCount > 0) {
      badge.textContent = pendingCount;
      badge.classList.add('show');
      badge.style.display = 'flex';
      badge.style.visibility = 'visible';
      console.log('Badge shown with count:', pendingCount);
    } else {
      badge.classList.remove('show');
      badge.style.display = 'none';
      badge.style.visibility = 'hidden';
      console.log('Badge hidden - no pending fees');
    }
  } else {
    console.error('Notification badge element not found!');
  }
}
// Create Student Card
function createStudentCard(student) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4';

  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const genderIcon = getGenderIcon(student.gender);

  const statusBadge = student.status === 'Active' ?
    '<span class="badge bg-success">🟢 Active</span>' :
    '<span class="badge bg-danger">🔴 Left</span>';

  col.innerHTML = `
<div class="student-card">
<div class="student-avatar">${initials}</div>
<div class="student-info">
<h5>${student.name} ${genderIcon}</h5>
<div class="student-detail">👨 ${student.fatherName}</div>
<div class="student-detail">📚 Class: ${student.class}</div>
<div class="student-detail">📖 Subject: ${student.subject || 'Not specified'}</div>
<div class="student-detail">⚥ Gender: ${student.gender || 'Not specified'}</div>
<div class="student-medium">${student.medium}</div>
<div class="mt-2">${statusBadge}</div>
</div>
<div class="profile-btn-container">
<button class="btn btn-profile" onclick="viewProfile(${student.id})" title="View Profile">
👤 Profile
</button>
</div>
</div>
`;

  return col;
}



// Add New Student
function addNewStudent() {
  const nameInput = document.getElementById('studentName');
  const fatherNameInput = document.getElementById('fatherName');
  const classInput = document.getElementById('studentClass');
  const subjectSelect = document.getElementById('studentSubject');
  const mediumSelect = document.getElementById('studentMedium');
  const genderSelect = document.getElementById('studentGender');
  const mobileInput = document.getElementById('studentMobile');

  const name = nameInput.value.trim();
  const fatherName = fatherNameInput.value.trim();
  const studentClass = classInput.value;
  const subject = subjectSelect.value;
  const medium = mediumSelect.value;
  const gender = genderSelect.value;
  const mobile = mobileInput.value.trim();

  // Validation
  if (!name) {
    showAlert('Please enter student name! 😊', 'warning');
    nameInput.focus();
    return;
  }

  if (!fatherName) {
    showAlert('Please enter father\'s name! 👨', 'warning');
    fatherNameInput.focus();
    return;
  }

  if (!studentClass) {
    showAlert('Please enter class! 📚', 'warning');
    classInput.focus();
    return;
  }

  if (!subject) {
    showAlert('Please select subject! 📖', 'warning');
    subjectSelect.focus();
    return;
  }

  if (!medium) {
    showAlert('Please select medium! 🗣️', 'warning');
    mediumSelect.focus();
    return;
  }

  if (!gender) {
    showAlert('Please select gender! ⚥', 'warning');
    genderSelect.focus();
    return;
  }

  // Mobile number validation
  if (!mobile) {
    showAlert('Please enter mobile number! 📱', 'warning');
    mobileInput.focus();
    return;
  }

  // Check if mobile number is exactly 10 digits
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    showAlert('Mobile number must be exactly 10 digits! 📱', 'error');
    mobileInput.focus();
    return;
  }

  // Add new student
  const newStudent = {
    id: studentsData.length + 1,
    name: name,
    fatherName: fatherName,
    class: studentClass,
    subject: subject,
    medium: medium,
    gender: gender,
    mobile: mobile,
    address: '',
    fees: 0,
    feesPaid: false,
    joinDate: new Date().toISOString().split('T')[0],
    lastFeePaidDate: null,
    leavingDate: null,
    status: 'Active'
  };

  studentsData.push(newStudent);

  // Clear form
  nameInput.value = '';
  fatherNameInput.value = '';
  classInput.value = '';
  subjectSelect.value = '';
  mediumSelect.value = '';
  genderSelect.value = '';
  mobileInput.value = '';

  // Reload students list
  loadStudents();
  // Auto-save data
  autoSave();

  showAlert(`${name} successfully added! 🎉`, 'success');
}
// Toggle Add Student Form
function toggleAddStudentForm() {
  const addForm = document.getElementById('addStudentForm');
  const toggleBtn = document.getElementById('toggleAddForm');

  if (addForm.style.display === 'none' || addForm.style.display === '') {
    addForm.style.display = 'block';
    addForm.style.opacity = '0';
    addForm.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      addForm.style.transition = 'all 0.3s ease';
      addForm.style.opacity = '1';
      addForm.style.transform = 'translateY(0)';
    }, 10);

    toggleBtn.innerHTML = '<span class="plus-btn me-2">−</span>Hide Form';
    showAlert('Add Students form opened! ✏️', 'info');
  } else {
    addForm.style.opacity = '0';
    addForm.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      addForm.style.display = 'none';
    }, 300);

    toggleBtn.innerHTML = '<span class="plus-btn me-2">+</span>Add Students';
    showAlert('Add Students form closed! 📝', 'info');
  }
}
// Profile Functions
function viewProfile(studentId) {
  const student = studentsData.find(s => s.id === studentId);
  if (student) {
    displayProfile(student);
    navigateToProfile();
  }
}
function navigateToProfile() {
  const studentsPage = document.getElementById('studentsPage');
  const profilePage = document.getElementById('profilePage');

  if (studentsPage && profilePage) {
    // Add transition effect
    studentsPage.style.opacity = '0';
    studentsPage.style.transform = 'translateX(-100px)';

    setTimeout(() => {
      studentsPage.style.display = 'none';
      profilePage.style.display = 'block';
      profilePage.style.opacity = '0';
      profilePage.style.transform = 'translateX(100px)';

      // Animate in
      setTimeout(() => {
        profilePage.style.transition = 'all 0.5s ease';
        profilePage.style.opacity = '1';
        profilePage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    showAlert('Profile loaded! 👤', 'success');
  }
}
function navigateFromProfileToStudents() {
  const studentsPage = document.getElementById('studentsPage');
  const profilePage = document.getElementById('profilePage');

  if (studentsPage && profilePage) {
    // Add transition effect
    profilePage.style.opacity = '0';
    profilePage.style.transform = 'translateX(100px)';

    setTimeout(() => {
      profilePage.style.display = 'none';
      studentsPage.style.display = 'block';
      studentsPage.style.opacity = '0';
      studentsPage.style.transform = 'translateX(-100px)';

      // Animate in
      setTimeout(() => {
        studentsPage.style.transition = 'all 0.5s ease';
        studentsPage.style.opacity = '1';
        studentsPage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    showAlert('Back to students list! 👨‍🎓', 'info');
  }
}
function displayProfile(student) {
  const profileContent = document.getElementById('profileContent');
  if (!profileContent) return;

  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const joinDate = new Date(student.joinDate).toLocaleDateString('en-IN');
  const leavingDate = student.leavingDate ? new Date(student.leavingDate).toLocaleDateString('en-IN') : 'Still Active';
  const feesStatus = student.feesPaid ? '✅ Paid' : '❌ Pending';
  const feesStatusClass = student.feesPaid ? 'text-success' : 'text-danger';
  const lastFeePaid = student.lastFeePaidDate ? new Date(student.lastFeePaidDate).toLocaleDateString('en-IN') : 'Never';
  const statusBadge = student.status === 'Active' ?
    '<span class="badge bg-success fs-6">🟢 Active</span>' :
    '<span class="badge bg-danger fs-6">🔴 Left</span>';

  // Generate fees chart data
  const feesChartData = generateFeesChart(student);

  profileContent.innerHTML = `
        <div class="profile-card">
        <div class="profile-header">
        <div class="profile-avatar-large">${initials}</div>
        <div class="profile-basic-info">
        <h3>${student.name}</h3>
        <p class="profile-subtitle">Student ID: #${student.id.toString().padStart(3, '0')}</p>
        ${statusBadge}
        </div>
        </div>

        <div class="profile-details">
        <div class="row">
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">👨</div>
        <div class="detail-content">
        <h6>Father's Name</h6>
        <p>${student.fatherName}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📚</div>
        <div class="detail-content">
        <h6>Class</h6>
        <p>${student.class}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📖</div>
        <div class="detail-content">
        <h6>Subject</h6>
        <p>${student.subject || 'Not specified'}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">🗣️</div>
        <div class="detail-content">
        <h6>Medium</h6>
        <p>${student.medium}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">⚥</div>
        <div class="detail-content">
        <h6>Gender</h6>
        <p>${student.gender || 'Not specified'}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📍</div>
        <div class="detail-content">
        <h6>Address</h6>
        <p>${student.address || 'Not provided'}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">💰</div>
        <div class="detail-content">
        <h6>Monthly Fees</h6>
        <p>₹${student.fees || 0}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">💳</div>
        <div class="detail-content">
        <h6>Fees Status</h6>
        <p class="${feesStatusClass} fw-bold">${feesStatus}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📅</div>
        <div class="detail-content">
        <h6>Join Date</h6>
        <p>${joinDate}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📆</div>
        <div class="detail-content">
        <h6>Leaving Date</h6>
        <p class="${student.status === 'Active' ? 'text-success' : 'text-danger'}">${leavingDate}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">💸</div>
        <div class="detail-content">
        <h6>Last Fee Paid</h6>
        <p>${lastFeePaid}</p>
        </div>
        </div>
        </div>
        <div class="col-md-6">
        <div class="profile-detail-card">
        <div class="detail-icon">📊</div>
        <div class="detail-content">
        <h6>Status</h6>
        <p class="${student.status === 'Active' ? 'text-success' : 'text-danger'} fw-bold">${student.status}</p>
        </div>
        </div>
        </div>
        </div>
        </div>

        <div class="profile-actions">
        <button class="btn btn-primary" onclick="editProfile(${student.id})">📝 Edit Profile</button>
        <button class="btn btn-info ms-2" onclick="showFeesChart(${student.id})">📊 Fees Chart</button>
        </div>
        </div>

        <!-- Fees Chart Section (Hidden initially) -->
        <div id="feesChartSection" class="fees-chart-section mt-4" style="display: none;">
        <div class="card shadow-lg border-0">
        <div class="card-header bg-gradient-primary text-white">
        <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0">📊 Monthly Fees Record</h5>
        <button class="btn btn-sm btn-light" onclick="hideFeesChart()">✕</button>
        </div>
        </div>
        <div class="card-body p-0">
        <div class="fees-chart-container">
        ${feesChartData}
        </div>
        </div>
        </div>
        </div>

        <!-- Edit Profile Form (Hidden initially) -->
        <div id="editProfileForm" class="edit-profile-section mt-4" style="display: none;">
        <div class="card">
        <div class="card-header bg-primary text-white">
        <h5 class="mb-0">📝 Edit Student Profile</h5>
        </div>
        <div class="card-body">
        <form id="editForm">
        <div class="row">
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Student Name</label>
        <input type="text" id="editName" class="form-control" value="${student.name}">
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Father's Name</label>
        <input type="text" id="editFatherName" class="form-control" value="${student.fatherName}">
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Class</label>
        <select id="editClass" class="form-control">
        <option value="9th" ${student.class === '9th' ? 'selected' : ''}>9th</option>
        <option value="10th" ${student.class === '10th' ? 'selected' : ''}>10th</option>
        <option value="11th" ${student.class === '11th' ? 'selected' : ''}>11th</option>
        <option value="12th" ${student.class === '12th' ? 'selected' : ''}>12th</option>
        <option value="Graduation" ${student.class === 'Graduation' ? 'selected' : ''}>Graduation</option>
        </select>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Subject</label>
        <select id="editSubject" class="form-control">
        <option value="Physics" ${student.subject === 'Physics' ? 'selected' : ''}>Physics</option>
        <option value="Chemistry" ${student.subject === 'Chemistry' ? 'selected' : ''}>Chemistry</option>
        <option value="Maths" ${student.subject === 'Maths' ? 'selected' : ''}>Maths</option>
        <option value="Biology" ${student.subject === 'Biology' ? 'selected' : ''}>Biology</option>
        <option value="English" ${student.subject === 'English' ? 'selected' : ''}>English</option>
        <option value="Polytechnic" ${student.subject === 'Polytechnic' ? 'selected' : ''}>Polytechnic</option>
        <option value="Other" ${student.subject === 'Other' ? 'selected' : ''}>Other</option>
        </select>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Medium</label>
        <select id="editMedium" class="form-control">
        <option value="Hindi" ${student.medium === 'Hindi' ? 'selected' : ''}>Hindi</option>
        <option value="English" ${student.medium === 'English' ? 'selected' : ''}>English</option>
        </select>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Gender</label>
        <select id="editGender" class="form-control">
        <option value="Male" ${student.gender === 'Male' ? 'selected' : ''}>Male (पुरुष)</option>
        <option value="Female" ${student.gender === 'Female' ? 'selected' : ''}>Female (महिला)</option>
        <option value="Other" ${student.gender === 'Other' ? 'selected' : ''}>Other (अन्य)</option>
        </select>
        </div>
        </div>
        <div class="col-md-12">
        <div class="form-group mb-3">
        <label class="form-label">Address</label>
        <textarea id="editAddress" class="form-control" rows="2" placeholder="Complete address">${student.address || ''}</textarea>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Monthly Fees (₹)</label>
        <input type="number" id="editFees" class="form-control" value="${student.fees || 0}">
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Fees Status</label>
        <select id="editFeesPaid" class="form-control">
        <option value="true" ${student.feesPaid ? 'selected' : ''}>✅ Paid</option>
        <option value="false" ${!student.feesPaid ? 'selected' : ''}>❌ Pending</option>
        </select>
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Joining Date</label>
        <input type="date" id="editJoinDate" class="form-control" value="${student.joinDate}">
        </div>
        </div>
        <div class="col-md-6">
        <div class="form-group mb-3">
        <label class="form-label">Leaving Date</label>
        <input type="date" id="editLeavingDate" class="form-control" value="${student.leavingDate || ''}">
        <small class="text-muted">Leave empty if student is still active</small>
        </div>
        </div>
        </div>
        <div class="d-flex gap-2">
        <button type="button" class="btn btn-success" onclick="saveProfile(${student.id})">💾 Save Changes</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit()">❌ Cancel</button>
        ${!student.feesPaid ? `<button type="button" class="btn btn-warning" onclick="markFeePaid(${student.id})">💳 Mark Fee as Paid</button>` : ''}
        </div>
        </form>
        </div>
        </div>
        </div>
        `;
}
// Show Alert Function
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

  document.body.appendChild(alertDiv);

  // Auto remove after 4 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 4000);
}
// Local Storage Functions
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}
function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}
// Load saved students data on initialization - Move this before DOMContentLoaded
const savedStudents = getFromLocalStorage('studentsData');
if (savedStudents && savedStudents.length > 0) {
  studentsData = savedStudents;
  console.log('Loaded students data from localStorage');
}
// Edit Profile Functions
function editProfile(studentId) {
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
    editForm.style.display = 'block';
    editForm.scrollIntoView({ behavior: 'smooth' });
    showAlert('Edit mode activated! 📝', 'info');
  }
}
function cancelEdit() {
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
    editForm.style.display = 'none';
    showAlert('Edit cancelled! ❌', 'warning');
  }
}
function saveProfile(studentId) {
  const student = studentsData.find(s => s.id === studentId);
  if (!student) return;

  // Get form values
  const name = document.getElementById('editName').value.trim();
  const fatherName = document.getElementById('editFatherName').value.trim();
  const studentClass = document.getElementById('editClass').value;
  const subject = document.getElementById('editSubject').value;
  const medium = document.getElementById('editMedium').value;
  const gender = document.getElementById('editGender').value;
  const address = document.getElementById('editAddress').value.trim();
  const fees = parseInt(document.getElementById('editFees').value) || 0;
  const feesPaid = document.getElementById('editFeesPaid').value === 'true';
  const joinDate = document.getElementById('editJoinDate').value;
  const leavingDate = document.getElementById('editLeavingDate').value;

  // Validation
  if (!name || !fatherName) {
    showAlert('Name and Father\'s name are required! 📝', 'warning');
    return;
  }

  // Update student data
  student.name = name;
  student.fatherName = fatherName;
  student.class = studentClass;
  student.subject = subject;
  student.medium = medium;
  student.gender = gender;
  student.address = address;
  student.fees = fees;
  student.joinDate = joinDate;
  student.leavingDate = leavingDate || null;

  // Auto-calculate status based on leaving date
  student.status = student.leavingDate ? 'Left' : 'Active';

  // If fees status changed to paid and was previously unpaid
  if (feesPaid && !student.feesPaid) {
    student.lastFeePaidDate = new Date().toISOString().split('T')[0];
  }
  student.feesPaid = feesPaid;

  // Auto-save data
  autoSave();

  // Check if fees chart was visible before reloading profile
  const feesChartSection = document.getElementById('feesChartSection');
  const wasChartVisible = feesChartSection && feesChartSection.style.display === 'block';

  // Reload students list and profile
  displayProfile(student);
  loadStudents();

  // Keep fees chart open if it was previously open
  if (wasChartVisible) {
    setTimeout(() => {
      const newFeesChartSection = document.getElementById('feesChartSection');
      if (newFeesChartSection) {
        newFeesChartSection.style.display = 'block';
      }
    }, 100);
  }

  // Hide edit form
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
    editForm.style.display = 'none';
  }

  showAlert(`${name}'s profile updated successfully! ✅`, 'success');
}
function markFeePaid(studentId) {
  const student = studentsData.find(s => s.id === studentId);
  if (!student) return;

  student.feesPaid = true;
  student.lastFeePaidDate = new Date().toISOString().split('T')[0];

  // Save to localStorage
  saveToLocalStorage('studentsData', studentsData);
  // Auto-save data
  autoSave();

  // Check if fees chart was visible before reloading profile
  const feesChartSection = document.getElementById('feesChartSection');
  const wasChartVisible = feesChartSection && feesChartSection.style.display === 'block';

  // Reload profile
  displayProfile(student);
  loadStudents();

  // Keep fees chart open if it was previously open
  if (wasChartVisible) {
    setTimeout(() => {
      const newFeesChartSection = document.getElementById('feesChartSection');
      if (newFeesChartSection) {
        newFeesChartSection.style.display = 'block';
      }
    }, 100);
  }

  showAlert(`${student.name}'s fee marked as paid! 💳✅`, 'success');
}
// Generate Fees Chart
function generateFeesChart(student) {
  const joinDate = new Date(student.joinDate);
  const currentDate = new Date();
  const months = [];
  let currentMonth = new Date(joinDate);

  // Initialize student fees history if not exists
  if (!student.feesHistory) {
    student.feesHistory = {};
  }

  // Generate months from joining date to current date
  while (currentMonth <= currentDate) {
    const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    const monthName = currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    const dueDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), joinDate.getDate());

    months.push({
      key: monthKey,
      name: monthName,
      dueDate: dueDate.toLocaleDateString('en-IN'),
      paid: student.feesHistory[monthKey] || false,
      amount: student.fees || 0
    });

    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }

  let chartHTML = '<div class="fees-chart-grid">';

  months.forEach((month, index) => {
    const statusIcon = month.paid ? '✅' : '❌';
    const statusClass = month.paid ? 'paid' : 'pending';
    const statusText = month.paid ? 'Paid' : 'Pending';

    chartHTML += `
        <div class="fees-month-card ${statusClass}" data-month="${month.key}" data-student="${student.id}">
        <div class="month-header">
        <div class="month-name">${month.name}</div>
        <div class="month-status">
        <span class="status-icon">${statusIcon}</span>
        <span class="status-text">${statusText}</span>
        </div>
        </div>
        <div class="month-details">
        <div class="due-date">Due: ${month.dueDate}</div>
        <div class="amount">₹${month.amount}</div>
        </div>
        <div class="month-actions">
        <button class="btn btn-sm ${month.paid ? 'btn-warning' : 'btn-success'}" 
        onclick="toggleMonthFees(${student.id}, '${month.key}', ${!month.paid})">
        ${month.paid ? '↶ Mark Unpaid' : '✓ Mark Paid'}
        </button>
        </div>
        </div>
        `;
  });

  chartHTML += '</div>';
  return chartHTML;
}

// Show/Hide Fees Chart
function showFeesChart(studentId) {
  const feesChartSection = document.getElementById('feesChartSection');
  if (feesChartSection) {
    feesChartSection.style.display = 'block';
    feesChartSection.scrollIntoView({ behavior: 'smooth' });
    showAlert('Fees chart loaded! 📊', 'info');
  }
}

function hideFeesChart() {
  const feesChartSection = document.getElementById('feesChartSection');
  if (feesChartSection) {
    feesChartSection.style.display = 'none';
    showAlert('Fees chart hidden! 📋', 'info');
  }
}

// Toggle Month Fees Status
function toggleMonthFees(studentId, monthKey, setPaid) {
  const student = studentsData.find(s => s.id === studentId);
  if (!student) return;

  if (!student.feesHistory) {
    student.feesHistory = {};
  }

  student.feesHistory[monthKey] = setPaid;

  // Update overall fees paid status based on current month
  const currentDate = new Date();
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

  // Update student's current fees status based on current month
  if (monthKey === currentMonthKey) {
    student.feesPaid = setPaid;
    if (setPaid) {
      student.lastFeePaidDate = new Date().toISOString().split('T')[0];
    }
  }

  // Save to localStorage
  saveToLocalStorage('studentsData', studentsData);
  // Auto-save data
  autoSave();

  // Check if fees chart was visible before reloading profile
  const feesChartSection = document.getElementById('feesChartSection');
  const wasChartVisible = feesChartSection && feesChartSection.style.display === 'block';

  // Reload profile and students list
  displayProfile(student);
  loadStudents();

  // Keep fees chart open if it was previously open
  if (wasChartVisible) {
    setTimeout(() => {
      const newFeesChartSection = document.getElementById('feesChartSection');
      if (newFeesChartSection) {
        newFeesChartSection.style.display = 'block';
      }
    }, 100);
  }

  const action = setPaid ? 'marked as paid' : 'marked as unpaid';
  showAlert(`${monthKey} fees ${action}! ${setPaid ? '✅' : '❌'}`, 'success');
}

// Auto-save function
function autoSave() {
  saveToLocalStorage('studentsData', studentsData);
  console.log('Data automatically saved!');
}


// Global error handler
window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  showAlert('Something went wrong! Please check the console for details.', 'danger');
});
// Search Functions
let searchResults = [];
let currentSearchIndex = -1;

// Handle search input
function handleSearch(query) {
  const searchTerm = query.trim().toLowerCase();
  const searchDropdown = document.getElementById('searchResults');
  
  if (!searchTerm) {
    hideSearchResults();
    closeSearchSidebar();
    clearSearchFilter();
    return;
  }

  // Search through all students
  searchResults = studentsData.filter(student => {
    return (
      student.name.toLowerCase().includes(searchTerm) ||
      student.fatherName.toLowerCase().includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm) ||
      (student.subject && student.subject.toLowerCase().includes(searchTerm)) ||
      student.medium.toLowerCase().includes(searchTerm) ||
      (student.gender && student.gender.toLowerCase().includes(searchTerm)) ||
      (student.mobile && student.mobile.includes(searchTerm)) ||
      (student.address && student.address.toLowerCase().includes(searchTerm))
    );
  });

  displaySearchResults(searchResults, searchTerm);
  displaySearchSidebar(searchResults, searchTerm);
}

// Display search results in dropdown
function displaySearchResults(results, searchTerm) {
  const searchDropdown = document.getElementById('searchResults');
  
  if (results.length === 0) {
    searchDropdown.innerHTML = `
      <div class="search-no-results">
        🔍 No students found for "${searchTerm}"
      </div>
    `;
  } else {
    const resultsHTML = results.map((student, index) => {
      const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const statusIcon = student.status === 'Active' ? '🟢' : '🔴';
      const genderIcon = getGenderIcon(student.gender);
      
      return `
        <div class="search-result-item" onclick="selectSearchResult(${student.id})" data-index="${index}">
          <div class="search-result-avatar">${initials}</div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightText(student.name, searchTerm)} ${genderIcon}</div>
            <div class="search-result-details">
              👨 ${highlightText(student.fatherName, searchTerm)} | 📚 ${highlightText(student.class, searchTerm)} | 
              📖 ${highlightText(student.subject || 'N/A', searchTerm)} | 
              🗣️ ${highlightText(student.medium, searchTerm)} ${statusIcon}
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    searchDropdown.innerHTML = resultsHTML;
  }
  
  searchDropdown.classList.add('show');
  currentSearchIndex = -1;
}

// Highlight matching text
function highlightText(text, searchTerm) {
  if (!searchTerm || !text) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark style="background: #ffeb3b; padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// Navigate search results with keyboard
function navigateSearchResults(direction, items) {
  // Remove previous selection
  items.forEach(item => item.classList.remove('selected'));
  
  // Calculate new index
  currentSearchIndex += direction;
  
  if (currentSearchIndex < 0) {
    currentSearchIndex = items.length - 1;
  } else if (currentSearchIndex >= items.length) {
    currentSearchIndex = 0;
  }
  
  // Add selection to current item
  if (items[currentSearchIndex]) {
    items[currentSearchIndex].classList.add('selected');
    items[currentSearchIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Select search result and navigate to profile
function selectSearchResult(studentId) {
  hideSearchResults();
  clearSearchInput();
  
  // Navigate to profile
  setTimeout(() => {
    viewProfile(studentId);
  }, 100);
  
  showAlert('Opening student profile! 👤', 'info');
}

// Hide search results dropdown
function hideSearchResults() {
  const searchDropdown = document.getElementById('searchResults');
  if (searchDropdown) {
    searchDropdown.classList.remove('show');
    currentSearchIndex = -1;
  }
}

// Clear search input
function clearSearchInput() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
  }
  clearSearchFilter();
}

// Clear search filter (if applied to students list)
function clearSearchFilter() {
  // If you want to implement live filtering of students list, add logic here
  // For now, we're just showing search results in dropdown
}

// Add CSS for selected search result item
const searchStyles = document.createElement('style');
searchStyles.textContent = `
  .search-result-item.selected {
    background: linear-gradient(135deg, #667eea, #764ba2) !important;
    color: white !important;
    transform: translateX(8px) !important;
  }
  
  .search-result-item.selected .search-result-name,
  .search-result-item.selected .search-result-details {
    color: white !important;
  }
  
  .search-result-item.selected mark {
    background: rgba(255, 255, 255, 0.3) !important;
    color: white !important;
  }
`;
document.head.appendChild(searchStyles);

// Search Sidebar Functions
function displaySearchSidebar(results, searchTerm) {
  const sidebar = document.getElementById('searchSidebar');
  const overlay = document.getElementById('searchSidebarOverlay');
  const sidebarContent = document.getElementById('sidebarSearchResults');
  
  if (results.length === 0) {
    sidebarContent.innerHTML = `
      <div class="sidebar-no-results">
        <div class="no-results-icon">🔍</div>
        <h6>No Students Found</h6>
        <p>No students match "${searchTerm}"</p>
      </div>
    `;
  } else {
    const sidebarHTML = results.map(student => {
      const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const genderIcon = getGenderIcon(student.gender);
      const statusBadge = student.status === 'Active' ? 
        '<span class="badge bg-success">🟢 Active</span>' : 
        '<span class="badge bg-danger">🔴 Left</span>';
      
      const feesStatus = student.feesPaid ? 'paid' : 'pending';
      const feesIcon = student.feesPaid ? '✅' : '❌';
      const feesText = student.feesPaid ? 'Fees Paid' : 'Fees Pending';
      
      return `
        <div class="sidebar-search-item">
          <div class="sidebar-student-header">
            <div class="sidebar-student-avatar">${initials}</div>
            <div class="sidebar-student-info">
              <h6>${highlightText(student.name, searchTerm)} ${genderIcon}</h6>
              <p class="sidebar-student-class">👨 ${highlightText(student.fatherName, searchTerm)}</p>
            </div>
          </div>
          
          <div class="sidebar-student-details">
            <div class="sidebar-detail-item">
              <span class="sidebar-detail-icon">📚</span>
              <div class="sidebar-detail-label">Class</div>
              <p class="sidebar-detail-value">${highlightText(student.class, searchTerm)}</p>
            </div>
            <div class="sidebar-detail-item">
              <span class="sidebar-detail-icon">📖</span>
              <div class="sidebar-detail-label">Subject</div>
              <p class="sidebar-detail-value">${highlightText(student.subject || 'N/A', searchTerm)}</p>
            </div>
            <div class="sidebar-detail-item">
              <span class="sidebar-detail-icon">🗣️</span>
              <div class="sidebar-detail-label">Medium</div>
              <p class="sidebar-detail-value">${highlightText(student.medium, searchTerm)}</p>
            </div>
            <div class="sidebar-detail-item">
              <span class="sidebar-detail-icon">📱</span>
              <div class="sidebar-detail-label">Mobile</div>
              <p class="sidebar-detail-value">${highlightText(student.mobile || 'N/A', searchTerm)}</p>
            </div>
          </div>
          
          <div class="sidebar-fees-status ${feesStatus}">
            <span class="sidebar-fees-icon">${feesIcon}</span>
            <div class="sidebar-detail-label">${feesText}</div>
            <p class="sidebar-fees-amount">₹${student.fees || 0}</p>
          </div>
          
          <div class="sidebar-student-status">
            ${statusBadge}
          </div>
          
          <div class="sidebar-student-actions">
            <button class="btn btn-primary" onclick="selectSearchResultFromSidebar(${student.id})">
              👤 View Profile
            </button>
            ${!student.feesPaid ? `
              <button class="btn btn-success" onclick="quickPayFeeFromSidebar(${student.id})">
                💳 Pay Fee
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
    
    sidebarContent.innerHTML = sidebarHTML;
  }
  
  // Show sidebar with animation
  sidebar.classList.add('show');
  overlay.classList.add('show');
  
  showAlert(`Found ${results.length} student${results.length !== 1 ? 's' : ''} matching "${searchTerm}" 🔍`, 'info');
}

function closeSearchSidebar() {
  const sidebar = document.getElementById('searchSidebar');
  const overlay = document.getElementById('searchSidebarOverlay');
  
  sidebar.classList.remove('show');
  overlay.classList.remove('show');
}

function selectSearchResultFromSidebar(studentId) {
  closeSearchSidebar();
  clearSearchInput();
  setTimeout(() => {
    viewProfile(studentId);
  }, 300);
  showAlert('Opening student profile! 👤', 'info');
}

function quickPayFeeFromSidebar(studentId) {
  const student = studentsData.find(s => s.id === studentId);
  if (!student) return;

  // Mark current fees as paid
  student.feesPaid = true;
  student.lastFeePaidDate = new Date().toISOString().split('T')[0];

  // Initialize fees history if not exists
  if (!student.feesHistory) {
    student.feesHistory = {};
  }

  // Mark current month as paid
  const currentDate = new Date();
  const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  student.feesHistory[currentMonthKey] = true;

  // Save to localStorage
  saveToLocalStorage('studentsData', studentsData);
  autoSave();

  // Reload students and update sidebar
  loadStudents();
  updateNotificationBadge();
  
  // Refresh sidebar if open
  const searchInput = document.getElementById('searchInput');
  if (searchInput.value.trim()) {
    handleSearch(searchInput.value);
  }

  showAlert(`${student.name}'s fee marked as paid! 💳✅`, 'success');
}

// Console welcome message
console.log(`
        🎉 Welcome Page & Students List Ready!
        📝 Features:
        - Welcome page with smooth transitions
        - Students list with add functionality
        - Advanced search functionality with sidebar
        - Form validation
        - Local storage support
        - Responsive design
        Happy coding! 💻✨
        `);
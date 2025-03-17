// Create SVG logo for the app
const createLogoSVG = () => {
  return `<svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <path d="M100 50L150 100L100 150L50 100L100 50Z" fill="#4285F4"/>
    <path d="M100 70L130 100L100 130L70 100L100 70Z" fill="white"/>
    <path d="M100 170L40 110L40 90L100 50L160 90L160 110L100 170Z" stroke="#4285F4" stroke-width="3"/>
  </svg>`;
};

// Create assets directory and logo
const createAssets = () => {
  if (!document.querySelector('.app-logo')) return;
  
  // Create assets directory if it doesn't exist
  const assetsDir = document.createElement('div');
  assetsDir.id = 'assets-dir';
  document.body.appendChild(assetsDir);
  
  // Set logo
  const logoSVG = createLogoSVG();
  document.querySelector('.app-logo').src = `data:image/svg+xml;base64,${btoa(logoSVG)}`;
};

// App initialization
document.addEventListener('DOMContentLoaded', function() {
  createAssets();
  initNavigation();
  initAddressValidation();
  init3DModelCheck();
  initPhotoUpload();
  initScheduling();
  initPayment();
});

// Navigation between screens
function initNavigation() {
  // Get Started button
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      showScreen('address-screen');
    });
  }
  
  // Back buttons
  const backButtons = document.querySelectorAll('.back-button');
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetScreen = button.getAttribute('data-target');
      if (targetScreen) {
        showScreen(targetScreen);
      }
    });
  });
  
  // Continue buttons
  document.getElementById('continue-address-btn').addEventListener('click', () => {
    if (validateAddress()) {
      showScreen('model-check-screen');
      setTimeout(() => {
        simulateModelCheck();
      }, 2000);
    }
  });
  
  document.getElementById('model-found-btn').addEventListener('click', () => {
    showScreen('instant-model-screen');
    init3DModel('3d-model-container');
  });
  
  document.getElementById('no-model-btn').addEventListener('click', () => {
    showScreen('photo-upload-screen');
  });
  
  document.getElementById('view-quote-btn').addEventListener('click', () => {
    showScreen('bid-screen');
    init3DModel('model-with-measurements', true);
  });
  
  document.getElementById('submit-photos-btn').addEventListener('click', () => {
    showScreen('processing-screen');
    simulateProcessing();
  });
  
  document.getElementById('processing-complete-btn').addEventListener('click', () => {
    showScreen('bid-screen');
    init3DModel('model-with-measurements', true);
  });
  
  document.getElementById('schedule-btn').addEventListener('click', () => {
    showScreen('schedule-screen');
  });
  
  document.getElementById('continue-to-payment-btn').addEventListener('click', () => {
    showScreen('payment-screen');
    document.getElementById('payment-total').textContent = document.getElementById('total-price').textContent;
  });
  
  document.getElementById('pay-now-btn').addEventListener('click', () => {
    showScreen('confirmation-screen');
    const selectedDate = document.getElementById('selected-date').textContent;
    const selectedTime = document.getElementById('selected-time').textContent;
    
    document.getElementById('confirmed-date').textContent = selectedDate;
    document.getElementById('confirmed-time').textContent = selectedTime;
  });
  
  document.getElementById('done-btn').addEventListener('click', () => {
    showScreen('welcome-screen');
    resetApp();
  });
}

// Show a specific screen
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show the selected screen
  document.getElementById(screenId).classList.add('active');
}

// Address validation with Google Maps API
function initAddressValidation() {
  // Initialize map
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;
  
  // Create a placeholder map (since we don't have a real API key)
  mapContainer.innerHTML = `
    <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e9e9e9;color:#777;">
      <div>
        <p style="text-align:center;margin-bottom:10px;">Map Preview</p>
        <p style="text-align:center;font-size:12px;">(Google Maps API would be integrated here)</p>
      </div>
    </div>
  `;
  
  // Add event listeners to address fields
  const streetAddressInput = document.getElementById('street-address');
  const cityStateZipInput = document.getElementById('city-state-zip');
  
  // Simulate address autocomplete
  [streetAddressInput, cityStateZipInput].forEach(input => {
    if (!input) return;
    
    input.addEventListener('input', () => {
      // In a real implementation, this would call the Google Places Autocomplete API
      console.log('Address field updated:', input.value);
    });
  });
  
  // Use current location button
  const useLocationBtn = document.getElementById('use-location-btn');
  if (useLocationBtn) {
    useLocationBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        useLocationBtn.textContent = 'Getting location...';
        useLocationBtn.disabled = true;
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real implementation, this would reverse geocode the coordinates
            console.log('Location:', position.coords.latitude, position.coords.longitude);
            
            // Simulate filling the address fields
            streetAddressInput.value = '123 Main Street';
            cityStateZipInput.value = 'Anytown, CA 12345';
            
            useLocationBtn.textContent = 'Location Found';
            setTimeout(() => {
              useLocationBtn.textContent = 'Use My Location';
              useLocationBtn.disabled = false;
            }, 2000);
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Could not get your location. Please enter your address manually.');
            useLocationBtn.textContent = 'Use My Location';
            useLocationBtn.disabled = false;
          }
        );
      } else {
        alert('Geolocation is not supported by your browser. Please enter your address manually.');
      }
    });
  }
}

// Validate address before proceeding
function validateAddress() {
  const streetAddress = document.getElementById('street-address').value.trim();
  const cityStateZip = document.getElementById('city-state-zip').value.trim();
  
  if (!streetAddress) {
    alert('Please enter your street address');
    return false;
  }
  
  if (!cityStateZip) {
    alert('Please enter your city, state, and ZIP code');
    return false;
  }
  
  return true;
}

// 3D Model check simulation
function init3DModelCheck() {
  // Initially hide the result buttons
  const resultDiv = document.getElementById('model-check-result');
  if (resultDiv) {
    resultDiv.classList.add('hidden');
  }
}

function simulateModelCheck() {
  const checkingStatus = document.getElementById('checking-status');
  const resultDiv = document.getElementById('model-check-result');
  
  if (!checkingStatus || !resultDiv) return;
  
  // Simulate checking process with status updates
  const statusMessages = [
    'Checking Google 3D Tiles...',
    'Checking LiDAR data...',
    'Checking property records...',
    'Analyzing available data...'
  ];
  
  let currentStep = 0;
  
  const updateStatus = () => {
    if (currentStep < statusMessages.length) {
      checkingStatus.textContent = statusMessages[currentStep];
      currentStep++;
      setTimeout(updateStatus, 1000);
    } else {
      checkingStatus.textContent = 'Check complete!';
      resultDiv.classList.remove('hidden');
    }
  };
  
  updateStatus();
}

// 3D Model visualization with Three.js
function init3DModel(containerId, showMeasurements = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear previous content
  container.innerHTML = '';
  
  try {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Create a simple house model
    const houseGroup = new THREE.Group();
    
    // House base (cube)
    const geometry = new THREE.BoxGeometry(3, 2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const house = new THREE.Mesh(geometry, material);
    houseGroup.add(house);
    
    // Roof (pyramid)
    const roofGeometry = new THREE.ConeGeometry(2.2, 1, 4);
    const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x4285F4, wireframe: true });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.5;
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);
    
    // Add measurements if needed
    if (showMeasurements) {
      // This would be more complex in a real implementation
      // Here we're just adding simple lines to represent measurements
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      
      // Width measurement
      const widthPoints = [];
      widthPoints.push(new THREE.Vector3(-1.5, -1, 1));
      widthPoints.push(new THREE.Vector3(1.5, -1, 1));
      const widthGeometry = new THREE.BufferGeometry().setFromPoints(widthPoints);
      const widthLine = new THREE.Line(widthGeometry, lineMaterial);
      houseGroup.add(widthLine);
      
      // Height measurement
      const heightPoints = [];
      heightPoints.push(new THREE.Vector3(1.5, -1, 1));
      heightPoints.push(new THREE.Vector3(1.5, 2, 1));
      const heightGeometry = new THREE.BufferGeometry().setFromPoints(heightPoints);
      const heightLine = new THREE.Line(heightGeometry, lineMaterial);
      houseGroup.add(heightLine);
    }
    
    // Add the house to the scene
    scene.add(houseGroup);
    
    // Animation
    function animate() {
      requestAnimationFrame(animate);
      houseGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    });
    
  } catch (error) {
    console.error('Error initializing 3D model:', error);
    container.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e9e9e9;color:#777;">
        <div>
          <p style="text-align:center;margin-bottom:10px;">3D Model Preview</p>
          <p style="text-align:center;font-size:12px;">(Three.js would render a 3D model here)</p>
        </div>
      </div>
    `;
  }
}

// Photo upload functionality
function initPhotoUpload() {
  const photoUploadArea = document.getElementById('photo-upload-area');
  const photoInput = document.getElementById('photo-input');
  const photoGrid = document.getElementById('photo-grid');
  const photosCount = document.getElementById('photos-count');
  const submitPhotosBtn = document.getElementById('submit-photos-btn');
  
  if (!photoUploadArea || !photoInput || !photoGrid || !photosCount || !submitPhotosBtn) return;
  
  // Store uploaded photos
  const uploadedPhotos = [];
  const MAX_PHOTOS = 6;
  
  // Click on upload area to trigger file input
  photoUploadArea.addEventListener('click', () => {
    photoInput.click();
  });
  
  // Handle file selection
  photoInput.addEventListener('change', (event) => {
    const files = event.target.files;
    
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (uploadedPhotos.length >= MAX_PHOTOS) break;
        
        const file = files[i];
        if (!file.type.startsWith('image/')) continue;
        
        uploadedPhotos.push(file);
        
        // Create thumbnail
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoItem = document.createElement('div');
          photoItem.className = 'photo-item';
          photoItem.innerHTML = `
            <img src="${e.target.result}" alt="Home photo">
            <div class="remove-photo" data-index="${uploadedPhotos.length - 1}">×</div>
          `;
          photoGrid.appendChild(photoItem);
          
          // Update count and button state
          photosCount.textContent = uploadedPhotos.length;
          submitPhotosBtn.disabled = uploadedPhotos.length < 3;
          
          // Add event listener to remove button
          photoItem.querySelector('.remove-photo').addEventListener('click', (event) => {
            event.stopPropagation();
            const index = parseInt(event.target.getAttribute('data-index'));
            removePhoto(index);
          });
        };
        reader.readAsDataURL(file);
      }
    }
    
    // Reset file input
    photoInput.value = '';
  });
  
  // Remove photo
  function removePhoto(index) {
    if (index >= 0 && index < uploadedPhotos.length) {
      uploadedPhotos.splice(index, 1);
      
      // Rebuild photo grid
      photoGrid.innerHTML = '';
      uploadedPhotos.forEach((photo, i) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoItem = document.createElement('div');
          photoItem.className = 'photo-item';
          photoItem.innerHTML = `
            <img src="${e.target.result}" alt="Home photo">
            <div class="remove-photo" data-index="${i}">×</div>
          `;
          photoGrid.appendChild(photoItem);
          
          // Add event listener to remove button
          photoItem.querySelector('.remove-photo').addEventListener('click', (event) => {
            event.stopPropagation();
            const index = parseInt(event.target.getAttribute('data-index'));
            removePhoto(index);
          });
        };
        reader.readAsDataURL(photo);
      });
      
      // Update count and button state
      photosCount.textContent = uploadedPhotos.length;
      submitPhotosBtn.disabled = uploadedPhotos.length < 3;
    }
  }
}

// Simulate processing of photos
function simulateProcessing() {
  const processingStatus = document.getElementById('processing-status');
  const progressBar = document.getElementById('processing-progress');
  const completeBtn = document.getElementById('processing-complete-btn');
  
  if (!processingStatus || !progressBar || !completeBtn) return;
  
  // Hide complete button initially
  completeBtn.style.display = 'none';
  
  // Simulate processing with status updates
  const statusMessages = [
    'Analyzing photos...',
    'Creating point cloud...',
    'Generating mesh...',
    'Applying textures...',
    'Finalizing 3D model...'
  ];
  
  let progress = 0;
  let currentStep = 0;
  
  const updateProgress = () => {
    progress += 5;
    if (progress <= 100) {
      progressBar.style.width = `${progress}%`;
      
      // Update status message at certain points
      if (progress % 20 === 0 && currentStep < statusMessages.length) {
        processingStatus.textContent = statusMessages[currentStep];
        currentStep++;
      }
      
      setTimeout(updateProgress, 300);
    } else {
      processingStatus.textContent = 'Processing complete!';
      completeBtn.style.display = 'block';
    }
  };
  
  updateProgress();
}

// Calendar and scheduling functionality
function initScheduling() {
  const calendarEl = document.getElementById('calendar');
  const timeSlotsContainer = document.getElementById('time-slots');
  const selectedDateEl = document.getElementById('selected-date');
  const selectedTimeEl = document.getElementById('selected-time');
  const continueToPaymentBtn = document.getElementById('continue-to-payment-btn');
  
  if (!calendarEl || !timeSlotsContainer || !selectedDateEl || !selectedTimeEl || !continueToPaymentBtn) return;
  
  try {
    // Initialize FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      selectable: true,
      select: function(info) {
        const selectedDate = info.start;
        
        // Don't allow dates in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          alert('Please select a future date');
          calendar.unselect();
          return;
        }
        
        // Format date for display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = selectedDate.toLocaleDateString('en-US', options);
        
        // Update selected date
        selectedDateEl.textContent = formattedDate;
        
        // Generate time slots for the selected date
        generateTimeSlots(selectedDate);
        
        // Unselect the date to allow reselection
        calendar.unselect();
      }
    });
    
    calendar.render();
    
    // Generate time slots for a given date
    function generateTimeSlots(date) {
      // Clear existing time slots
      timeSlotsContainer.innerHTML = '';
      
      // Reset selected time
      selectedTimeEl.textContent = 'None';
      continueToPaymentBtn.disabled = true;
      
      // Generate time slots from 9 AM to 5 PM
      const startHour = 9;
      const endHour = 17;
      
      for (let hour = startHour; hour < endHour; hour += 2) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        
        // Format time (12-hour format)
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const timeText = `${hour12}:00 ${ampm}`;
        
        timeSlot.textContent = timeText;
        
        // Randomly make some slots unavailable
        const isAvailable = Math.random() > 0.3;
        if (!isAvailable) {
          timeSlot.classList.add('unavailable');
        } else {
          // Add click event for available slots
          timeSlot.addEventListener('click', () => {
            // Remove selected class from all time slots
            document.querySelectorAll('.time-slot').forEach(slot => {
              slot.classList.remove('selected');
            });
            
            // Add selected class to clicked time slot
            timeSlot.classList.add('selected');
            
            // Update selected time
            selectedTimeEl.textContent = `${timeText} - ${hour12 + 2}:00 ${ampm}`;
            
            // Enable continue button
            continueToPaymentBtn.disabled = false;
          });
        }
        
        timeSlotsContainer.appendChild(timeSlot);
      }
    }
    
  } catch (error) {
    console.error('Error initializing calendar:', error);
    calendarEl.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f9f9f9;color:#777;">
        <div>
          <p style="text-align:center;margin-bottom:10px;">Calendar</p>
          <p style="text-align:center;font-size:12px;">(FullCalendar would be displayed here)</p>
        </div>
      </div>
    `;
    
    // Create some dummy time slots
    timeSlotsContainer.innerHTML = `
      <div class="time-slot">9:00 AM</div>
      <div class="time-slot selected">11:00 AM</div>
      <div class="time-slot">1:00 PM</div>
      <div class="time-slot unavailable">3:00 PM</div>
      <div class="time-slot">5:00 PM</div>
    `;
    
    // Set default values
    selectedDateEl.textContent = 'Tuesday, March 24, 2025';
    selectedTimeEl.textContent = '11:00 AM - 1:00 PM';
    continueToPaymentBtn.disabled = false;
    
    // Add click event to time slots
    document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
      slot.addEventListener('click', () => {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        selectedTimeEl.textContent = `${slot.textContent} - ${parseInt(slot.textContent) + 2}:00 PM`;
      });
    });
  }
}

// Payment processing
function initPayment() {
  const paymentMethods = document.querySelectorAll('.payment-method');
  
  paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
      // Remove selected class from all payment methods
      paymentMethods.forEach(m => m.classList.remove('selected'));
      
      // Add selected class to clicked payment method
      method.classList.add('selected');
    });
  });
}

// Reset app state
function resetApp() {
  // Reset address fields
  document.getElementById('street-address').value = '';
  document.getElementById('city-state-zip').value = '';
  
  // Reset photo upload
  document.getElementById('photo-grid').innerHTML = '';
  document.getElementById('photos-count').textContent = '0';
  document.getElementById('submit-photos-btn').disabled = true;
  
  // Reset model check result
  const resultDiv = document.getElementById('model-check-result');
  if (resultDiv) {
    resultDiv.classList.add('hidden');
  }
  
  // Reset processing
  const completeBtn = document.getElementById('processing-complete-btn');
  if (completeBtn) {
    completeBtn.style.display = 'none';
  }
  
  const progressBar = document.getElementById('processing-progress');
  if (progressBar) {
    progressBar.style.width = '0%';
  }
  
  // Reset scheduling
  const selectedDateEl = document.getElementById('selected-date');
  const selectedTimeEl = document.getElementById('selected-time');
  if (selectedDateEl && selectedTimeEl) {
    selectedDateEl.textContent = 'None';
    selectedTimeEl.textContent = 'None';
  }
  
  const continueToPaymentBtn = document.getElementById('continue-to-payment-btn');
  if (continueToPaymentBtn) {
    continueToPaymentBtn.disabled = true;
  }
}

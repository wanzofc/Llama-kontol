
        function redirectWithLoading(url) {
            document.getElementById('loading-spinner').style.display = 'block';
            setTimeout(() => {
                window.location.href = url;
            }, 2000);
        }
        function showNotification(platform) {
            alert(`Redirecting to get ${platform} API key...`);
        }
        const sidebar = document.getElementById("sidebar");
        const sidebarContent = document.getElementById("sidebar-content");

        sidebar.addEventListener("click", () => {
            sidebarContent.style.display =
                sidebarContent.style.display === "block" ? "none" : "block";
        });
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
        window.addEventListener('scroll', () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                if (elementTop < windowHeight - 150) {
                    reveals[i].classList.add('show');
                } else {
                    reveals[i].classList.remove('show');
                }
            }
        });
        function showProgressiveNotification(message) {
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '20px';
            notification.style.backgroundColor = '#007bff';
            notification.style.color = 'white';
            notification.style.padding = '10px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            notification.innerText = message;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.style.opacity = 0;
            }, 200);
            setTimeout(() => {
                notification.remove();
            }, 200);
        }
        showProgressiveNotification("welcome to api wanzofc!");
        if (window.matchMedia('(display-mode: standalone)').matches) {
        } else {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                const installButton = document.createElement('button');
                installButton.textContent = 'Install App';
                document.body.appendChild(installButton);
                installButton.addEventListener('click', () => {
                    e.prompt();
                    installButton.style.display = 'none';
                });
            });
        }
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.continuous = true;
            recognition.onstart = () => {
                console.log("Voice recognition started");
            };
            recognition.onresult = (event) => {
                const speechResult = event.results[event.results.length - 1][0].transcript;
                console.log("Speech result:", speechResult);
            };
            recognition.onerror = (event) => {
                console.log("Speech recognition error:", event.error);
            };
            recognition.start();
        } else {
            console.log("Speech recognition is not supported in this browser");
        }
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
        });
    }
    if (!navigator.onLine) {
        const offlineMessage = document.createElement('div');
        offlineMessage.style.position = 'fixed';
        offlineMessage.style.bottom = '0';
        offlineMessage.style.width = '100%';
        offlineMessage.style.backgroundColor = '#ff5722';
        offlineMessage.style.color = 'white';
        offlineMessage.style.textAlign = 'center';
        offlineMessage.style.padding = '10px 0';
        offlineMessage.style.zIndex = '1000';
        offlineMessage.textContent = 'Anda sedang offline. Beberapa fitur mungkin tidak berfungsi.';
        document.body.appendChild(offlineMessage);
    }
let 
  requestCount = 0;
const maxRequests = 1000;  
const apiResultDiv = document.getElementById('api-result-content');
const loadingText = document.getElementById('loading-text');
const loadApiBtn = document.getElementById('load-api-btn');

loadApiBtn.addEventListener('click', () => {
    if (requestCount >= maxRequests) {
        alert('Batas permintaan API tercapai. tunggu 15 menit.');
        return;
    }
    requestCount++;
    loadingText.innerText = 'Memuat...';
    fetch('/get-api-data')
        .then(response => response.json())
        .then(data => {
            apiResultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
            loadingText.innerText = 'Selesai memuat!';
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
            loadingText.innerText = 'Gagal memuat data.';
        });
});

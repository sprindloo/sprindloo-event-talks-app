document.addEventListener('DOMContentLoaded', () => {
    const schedule = document.getElementById('schedule');
    const searchInput = document.getElementById('search');
    let talksData = [];

    // Fetch talks from the server
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            talksData = data;
            renderSchedule(talksData);
        });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTalks = talksData.filter(talk => 
            talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    // Render schedule
    function renderSchedule(talks) {
        schedule.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0);

        talks.forEach((talk, index) => {
            if (index === 3) {
                // Lunch break
                const breakElement = document.createElement('div');
                breakElement.classList.add('break');
                const lunchStartTime = new Date(currentTime.getTime());
                const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60 * 1000);
                breakElement.textContent = `Lunch Break (${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)})`;
                schedule.appendChild(breakElement);
                currentTime.setMinutes(currentTime.getMinutes() + 60);
            }

            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');

            const talkStartTime = new Date(currentTime.getTime());
            const talkEndTime = new Date(talkStartTime.getTime() + talk.duration * 60 * 1000);

            talkElement.innerHTML = `
                <div class="time">${formatTime(talkStartTime)} - ${formatTime(talkEndTime)}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">By: ${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div class="category">
                    ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
                </div>
            `;
            schedule.appendChild(talkElement);

            currentTime.setMinutes(currentTime.getMinutes() + parseInt(talk.duration) + 10);
        });
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
});

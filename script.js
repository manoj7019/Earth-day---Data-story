/* Biogas Production Top 10 countries slider */

const data = [
    { rank: 1,  country: "Germany",        value: 87,  unit: "TWh/y" },
    { rank: 2,  country: "China",          value: 81,  unit: "TWh/y" },
    { rank: 3,  country: "United Kingdom", value: 32,  unit: "TWh/y" },
    { rank: 4,  country: "France",         value: 25,  unit: "TWh/y" },
    { rank: 5,  country: "Brazil",         value: 12,  unit: "TWh/y" },
    { rank: 6,  country: "Denmark",        value: 7,   unit: "TWh/y" },
    { rank: 7,  country: "India",          value: 4.75,unit: "TWh/y" },
    { rank: 8,  country: "Sweden",         value: 2.5, unit: "TWh/y" },
    { rank: 9,  country: "Netherlands",    value: 2.5, unit: "TWh/y" },
    { rank: 10, country: "Canada",         value: 2.5, unit: "TWh/y" },
  ];
 
  const maxValue = Math.max(...data.map(d => d.value));
  const chart = document.getElementById('chart');
 
  data.forEach(d => {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
      <div class="rank">${d.rank}</div>
      <div class="country">${d.country}</div>
      <div class="bar-track"><div class="bar" data-target="${(d.value / maxValue) * 100}" data-value="${d.value}"></div></div>
      <div class="value"><span class="num">0</span> <small>${d.unit}</small></div>
    `;
    chart.appendChild(row);
  });
 
  const bars = document.querySelectorAll('.bar');
  const nums = document.querySelectorAll('.num');
  const progressEl = document.getElementById('progress');
  const scrollTrack = document.querySelector('.scroll-track');
 
  function updateAnimation() {
    const rect = scrollTrack.getBoundingClientRect();
    const trackHeight = scrollTrack.offsetHeight - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), trackHeight);
    const progress = trackHeight > 0 ? scrolled / trackHeight : 0;
 
    // progressEl.textContent = `${Math.round(progress * 100)}%`;
 
    bars.forEach((bar, i) => {
      const target = parseFloat(bar.dataset.target);
      const value = parseFloat(bar.dataset.value);
      // Stagger bars slightly so they animate in sequence
      const delay = i * 0.04;
      const localProgress = Math.min(Math.max((progress - delay) / (1 - delay), 0), 1);
      const width = target * localProgress;
      bar.style.width = width + '%';
      nums[i].textContent = (value * localProgress).toFixed(value < 10 ? 1 : 0);
    });
  }
 
  window.addEventListener('scroll', updateAnimation, { passive: true });
  window.addEventListener('resize', updateAnimation);
  updateAnimation();

 // ---- Intersection Observer for scroll-triggered animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
 
        // Animate count-up numbers
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          animateNumber(el, parseInt(el.dataset.count));
        });
 
        // Animate bars
        entry.target.querySelectorAll('.stream-bar').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.target + '%';
          }, i * 100);
        });
 
        // Animate flow bars
        entry.target.querySelectorAll('[data-target-feed]').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.targetFeed + '%';
          }, i * 120);
        });
        entry.target.querySelectorAll('[data-target-cbg]').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.targetCbg + '%';
          }, i * 120 + 300);
        });
 
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
 
  // Observe sections
  document.querySelectorAll('.stream-card, .total-banner, .flow-section, .callout').forEach(el => {
    observer.observe(el);
  });
 
  // Stagger card appearances
  document.querySelectorAll('.stream-card').forEach((card, i) => {
    card.style.animationDelay = (0.1 + i * 0.1) + 's';
  });
 
  // Count-up animation
  function animateNumber(el, target) {
    const duration = 1200;
    const start = performance.now();
 
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
 
    requestAnimationFrame(tick);
  }


// PROJECTS-SECTION
document.getElementById('map-igrpl-project-box').style.display = 'none';

document.getElementById('map-bio-epc-button').classList.add('map-active-button');

document.getElementById('map-igrpl-button').addEventListener('click', () => {
    document.getElementById('map-igrpl-button').classList.add('map-active-button');
    document.getElementById('map-bio-epc-button').classList.remove('map-active-button');
    document.getElementById('map-igrpl-project-box').style.display = 'flex';
    document.getElementById('map-bio-epc-project-box').style.display = 'none';
})

document.getElementById('map-bio-epc-button').addEventListener('click', () => {
    console.log('map-bio-epc-button clicked');
    document.getElementById('map-bio-epc-button').classList.add('map-active-button');
    document.getElementById('map-igrpl-button').classList.remove('map-active-button');
    document.getElementById('map-bio-epc-project-box').style.display = 'flex';
    document.getElementById('map-igrpl-project-box').style.display = 'none';
    // mapClick.play();
})

document.getElementById('INMP').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-mp').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})

document.getElementById('INMP').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('INMP').style.fill = ' var(--stateColor)';
})

document.getElementById('INMP').addEventListener('mousemove', function() {
    document.getElementById('INMP').style.fill = 'rgb(0, 60, 0)';
    // document.getElementById('INMP').style.filter = 'drop-shadow(0 0 5px #4dff56) drop-shadow(0 0 5px #4dff56) drop-shadow(0 0 20px #4dff56)';
    document.getElementById('INUP').style.fill = ' var(--stateColor)';
    document.getElementById('INHR').style.fill = ' var(--stateColor)';
    document.getElementById('INAP').style.fill = ' var(--stateColor)';
    document.getElementById('INCT').style.fill = ' var(--stateColor)';
    document.getElementById('INRJ').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})

document.getElementById('INUP').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-up').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INUP').addEventListener('mousemove', function() {
    document.getElementById('INUP').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})

document.getElementById('INUP').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('INUP').style.fill = ' var(--stateColor)';
})

document.getElementById('INHR').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-hr').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INHR').addEventListener('mousemove', function() {
    document.getElementById('INHR').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INHR').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('INHR').style.fill = ' var(--stateColor)';
})

document.getElementById('INAP').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-ap').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INAP').addEventListener('mousemove', function() {
    document.getElementById('INAP').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INAP').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('INAP').style.fill = ' var(--stateColor)';
})

document.getElementById('INCT').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-ct').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INCT').addEventListener('mousemove', function() {
    document.getElementById('INCT').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INCT').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('INCT').style.fill = ' var(--stateColor)';
})

document.getElementById('INRJ').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-rj').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INRJ').addEventListener('mousemove', function() {
    document.getElementById('INRJ').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INRJ').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('INRJ').style.fill = ' var(--stateColor)';
})

document.getElementById('INGJ').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-gj').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INGJ').addEventListener('mousemove', function() {
    document.getElementById('INGJ').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INGJ').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
})

document.getElementById('INPB').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-pb').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INPB').addEventListener('mousemove', function() {
    document.getElementById('INPB').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INOD').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INPB').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
})

document.getElementById('INOR').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-od').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INOR').addEventListener('mousemove', function() {
    document.getElementById('INOR').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INOR').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('INOR').style.fill = ' var(--stateColor)';
})

document.getElementById('INTN').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-tn').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INTN').addEventListener('mousemove', function() {
    document.getElementById('INTN').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INOR').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INTN').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
})

document.getElementById('INWB').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-wb').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INWB').addEventListener('mousemove', function() {
    document.getElementById('INWB').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INOR').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INWB').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
})

document.getElementById('INKA').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-ka').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INKA').addEventListener('mousemove', function() {
    document.getElementById('INKA').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INOR').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})
document.getElementById('INKA').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
})

document.getElementById('INMH').addEventListener('mousemove', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-mh').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-mp').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-up').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tn').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-od').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ka').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-wb').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INMH').addEventListener('mousemove', function() {
    document.getElementById('INMH').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INMP').style.fill = 'var(--stateColor)';
    document.getElementById('INUP').style.fill = 'var(--stateColor)';
    document.getElementById('INAP').style.fill = 'var(--stateColor)';
    document.getElementById('INCT').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ').style.fill = 'var(--stateColor)';
    document.getElementById('INHR').style.fill = 'var(--stateColor)';
    document.getElementById('INPB').style.fill = ' var(--stateColor)';
    document.getElementById('INGJ').style.fill = ' var(--stateColor)';
    document.getElementById('INTN').style.fill = ' var(--stateColor)';
    document.getElementById('INOR').style.fill = ' var(--stateColor)';
    document.getElementById('INWB').style.fill = ' var(--stateColor)';
    document.getElementById('INKA').style.fill = ' var(--stateColor)';
})
document.getElementById('INMH').addEventListener('mouseleave', function() {
    document.getElementById('map-default-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-mh').classList.remove('map-project-card-containers');
    document.getElementById('INMH').style.fill = ' var(--stateColor)';
})

// document.getElementById('INMP').addEventListener('onmouseout', function() {
//     document.getElementById('project-card-container').style.display = 'none';
// })

document.getElementById('INUP2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-up2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INUP2').addEventListener('mousemove', function() {
    document.getElementById('INUP2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INUP2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('INUP2').style.fill = ' var(--stateColor)';
})

document.getElementById('INHR2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-hr2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INHR2').addEventListener('mousemove', function() {
    document.getElementById('INHR2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INHR2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('INHR2').style.fill = ' var(--stateColor)';
})

document.getElementById('INAP2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-ap2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INAP2').addEventListener('mousemove', function() {
    document.getElementById('INAP2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INAP2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('INAP2').style.fill = ' var(--stateColor)';
})


document.getElementById('INCT2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-ct2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INCT2').addEventListener('mousemove', function() {
    document.getElementById('INCT2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INCT2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('INCT2').style.fill = ' var(--stateColor)';
})


document.getElementById('INPB2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-pb2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INPB2').addEventListener('mousemove', function() {
    document.getElementById('INPB2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INPB2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('INPB2').style.fill = ' var(--stateColor)';
})


document.getElementById('INGJ2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-gj2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INGJ2').addEventListener('mousemove', function() {
    document.getElementById('INGJ2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INGJ2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('INGJ2').style.fill = ' var(--stateColor)';
})


document.getElementById('INRJ2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-rj2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INRJ2').addEventListener('mousemove', function() {
    document.getElementById('INRJ2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INRJ2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('INRJ2').style.fill = ' var(--stateColor)';
})

document.getElementById('INMP2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-mp2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INMP2').addEventListener('mousemove', function() {
    document.getElementById('INMP2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INMP2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('INMP2').style.fill = ' var(--stateColor)';
})

document.getElementById('INBR2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-br2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INBR2').addEventListener('mousemove', function() {
    document.getElementById('INBR2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INTG2').style.fill = 'var(--stateColor)';
})
document.getElementById('INBR2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    document.getElementById('INBR2').style.fill = ' var(--stateColor)';
})

document.getElementById('INTG2').addEventListener('mousemove', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'none';
    document.getElementById('map-project-card-container-tg2').classList.add('map-project-card-containers');
    document.getElementById('map-project-card-container-up2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-hr2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ap2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-ct2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-pb2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-gj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-mp2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-rj2').classList.remove('map-project-card-containers');
    document.getElementById('map-project-card-container-br2').classList.remove('map-project-card-containers');
    // mapClick.play();
})
document.getElementById('INTG2').addEventListener('mousemove', function() {
    document.getElementById('INTG2').style.fill = 'rgb(0, 60, 0)';
    document.getElementById('INUP2').style.fill = 'var(--stateColor)';
    document.getElementById('INHR2').style.fill = 'var(--stateColor)';
    document.getElementById('INAP2').style.fill = 'var(--stateColor)';
    document.getElementById('INCT2').style.fill = 'var(--stateColor)';
    document.getElementById('INPB2').style.fill = 'var(--stateColor)';
    document.getElementById('INGJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INMP2').style.fill = 'var(--stateColor)';
    document.getElementById('INRJ2').style.fill = 'var(--stateColor)';
    document.getElementById('INBR2').style.fill = 'var(--stateColor)';
})
document.getElementById('INTG2').addEventListener('mouseleave', function() {
    document.getElementById('map-igrpl-projects-info-right').style.display = 'flex';
    document.getElementById('map-project-card-container-tg2').classList.remove('map-project-card-containers');
    document.getElementById('INTG2').style.fill = ' var(--stateColor)';
})

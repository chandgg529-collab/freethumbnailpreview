// FreeThumbnailPreview Lite - Core Scripts

document.addEventListener('DOMContentLoaded', () => {
  const imageInput = document.getElementById('imageInput');
  const dropZone = document.getElementById('dropZone');
  const uploadLabel = document.getElementById('uploadLabel');
  const titleInput = document.getElementById('titleInput');
  const charCount = document.getElementById('charCount');
  const channelInput = document.getElementById('channelInput');

  const desktopThumb = document.getElementById('desktopThumb');
  const mobileThumb = document.getElementById('mobileThumb');
  const desktopTitle = document.getElementById('desktopTitle');
  const mobileTitle = document.getElementById('mobileTitle');
  const desktopChannel = document.getElementById('desktopChannel');
  const mobileChannel = document.getElementById('mobileChannel');

  const btnBlur = document.getElementById('btnBlur');
  const btnGrayscale = document.getElementById('btnGrayscale');
  const btnReset = document.getElementById('btnReset');

  const desktopThumbBox = document.getElementById('desktopThumbBox');
  const mobileThumbBox = document.getElementById('mobileThumbBox');

  // Title binding
  titleInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'Untitled Video';
    desktopTitle.textContent = val;
    mobileTitle.textContent = val;
    charCount.textContent = e.target.value.length;
  });

  // Channel binding
  channelInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'Channel Name';
    desktopChannel.textContent = val;
    mobileChannel.textContent = val;
    const initial = val.charAt(0).toUpperCase() || 'C';
    document.querySelectorAll('.yt-avatar').forEach(el => el.textContent = initial);
  });

  // Image Upload Handling
  dropZone.addEventListener('click', () => imageInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#3b82f6';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  });

  imageInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImage(e.target.files[0]);
    }
  });

  function handleImage(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      desktopThumb.src = event.target.result;
      mobileThumb.src = event.target.result;
      uploadLabel.textContent = file.name;
    };
    reader.readAsDataURL(file);
  }

  // Filter Toggles
  btnBlur.addEventListener('click', () => {
    btnBlur.classList.toggle('active');
    desktopThumbBox.classList.toggle('apply-blur');
    mobileThumbBox.classList.toggle('apply-blur');
  });

  btnGrayscale.addEventListener('click', () => {
    btnGrayscale.classList.toggle('active');
    desktopThumbBox.classList.toggle('apply-grayscale');
    mobileThumbBox.classList.toggle('apply-grayscale');
  });

  btnReset.addEventListener('click', () => {
    btnBlur.classList.remove('active');
    btnGrayscale.classList.remove('active');
    desktopThumbBox.classList.remove('apply-blur', 'apply-grayscale');
    mobileThumbBox.classList.remove('apply-blur', 'apply-grayscale');
  });
});

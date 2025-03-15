document.addEventListener('DOMContentLoaded', () => {
    const slots = document.querySelectorAll('.slot');
    const materials = document.querySelectorAll('.material');
    const craftBtn = document.getElementById('craft-btn');
    const result = document.getElementById('result');
    const birthdayMessage = document.getElementById('birthday-message');
    const craftSound = document.getElementById('craft-sound');
    const birthdaySound = document.getElementById('birthday-sound');

    // Xử lý kéo thả
    materials.forEach(material => {
        material.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', material.dataset.item);
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => e.preventDefault());
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const item = e.dataTransfer.getData('text');
            slot.innerHTML = `<img src="images/${item}.png" alt="${item}">`;
            slot.classList.add('filled');
            slot.dataset.item = item;
            slot.classList.remove('hint'); // Xóa gợi ý cũ khi thả mới
            slot.removeAttribute('data-hint');
        });
    });

    // Công thức bánh kem trong Minecraft
    craftBtn.addEventListener('click', () => {
        const grid = [
            [slots[0].dataset.item || '', slots[1].dataset.item || '', slots[2].dataset.item || ''],
            [slots[3].dataset.item || '', slots[4].dataset.item || '', slots[5].dataset.item || ''],
            [slots[6].dataset.item || '', slots[7].dataset.item || '', slots[8].dataset.item || '']
        ];

        const cakeRecipe = [
            ['milk', 'milk', 'milk'],
            ['sugar', 'egg', 'sugar'],
            ['wheat', 'wheat', 'wheat']
        ];

        let isCorrect = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] !== cakeRecipe[i][j]) {
                    isCorrect = false;
                }
            }
        }

        if (isCorrect) {
            result.innerHTML = `<img src="images/cake.png" alt="Bánh Kem">`;
            craftSound.play();
            setTimeout(() => {
                birthdayMessage.style.display = 'block';
                birthdaySound.play();
            }, 500);
        } else {
            result.textContent = 'Không đúng!';
            result.classList.add('error');
            setTimeout(() => result.classList.remove('error'), 1000);

            // Hiển thị gợi ý cho các ô sai
            slots.forEach((slot, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                const correctItem = cakeRecipe[row][col];
                const currentItem = slot.dataset.item || '';

                if (currentItem !== correctItem) {
                    slot.classList.add('hint');
                    slot.dataset.hint = correctItem === 'milk' ? 'Sữa' :
                                      correctItem === 'sugar' ? 'Đường' :
                                      correctItem === 'egg' ? 'Trứng' :
                                      correctItem === 'wheat' ? 'Lúa Mì' : '';
                } else {
                    slot.classList.remove('hint');
                    slot.removeAttribute('data-hint');
                }
            });
        }
    });
});
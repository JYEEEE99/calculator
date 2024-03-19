        // 클라이언트 측에서 차종 리스트 생성
        const carList = document.getElementById('carList');
        const fuelEfficiencyInput = document.getElementById('fuelEfficiency');

        // 각 카테고리별 차량 리스트 데이터
        const carData = {
            "Genesis": {
                "G70": {
                    "2.0T": 9.5,
                    "3.3T": 8.5
                },
                "G80": {
                    "2.5T": 9.5,
                    "3.5T": 8.5
                },
                "G90": {
                    "3.3T": 8.0,
                    "5.0": 7.5
                },
                "GV70": {
                    "2.5T": 9.5,
                    "3.5T": 8.5
                },
                "GV80": {
                    "2.5T": 9.0,
                    "3.5T": 8.0
                }
            },
            "Hyundai": {
                "그랜저": {
                    "2.4L 가솔린": 9.8,
                    "3.0L 가솔린": 8.8,
                    "2.2L 디젤": 13.25
                },
                "쏘나타": {
                    "2.0L 가솔린": 10.75,
                    "2.4L 가솔린": 9.75,
                    "1.6L 디젤": 13.75
                },
                "아반떼": {
                    "1.6L 가솔린": 12.75,
                    "1.6L 디젤": 15.75
                },
                "아슬란": {
                    "1.6L 가솔린": 13.75,
                    "1.6L 디젤": 16.75
                },
                "벨로스터": {
                    "1.6L 터보 가솔린": 9.75
                },
                "투싼": {
                    "2.0L 가솔린": 11.25,
                    "1.6L 디젤": 15.25
                },
                "코나": {
                    "1.6L 가솔린": 12.25,
                    "1.6L 디젤": 15.75
                },
                "팰리세이드": {
                    "3.8L 가솔린": 7.75,
                    "2.2L 디젤": 11.75
                },
                "스타렉스(스타리아)": {
                    "2.5L 디젤": 10.75,
                    "2.2L 디젤": 12.25
                },
                "아이오닉": {
                    "하이브리드": 21.25,
                    "플러그인 하이브리드": 42.5
                }
            },
            "Mercedes-Benz": {
                "A-Class": {
                    "A180": 11.0,
                    "A200": 10.5
                },
                "C-Class": {
                    "C180": 11.5,
                    "C200": 11.0
                },
                "E-Class": {
                    "E200": 11.0,
                    "E300": 10.0
                },
                "S-Class": {
                    "S450": 9.0,
                    "S560": 8.5
                },
                "GLA-Class": {
                    "GLA180": 12.0,
                    "GLA200": 11.5
                },
                "GLC-Class": {
                    "GLC200": 11.5,
                    "GLC300": 11.0
                },
                "GLE-Class": {
                    "GLE350": 10.5,
                    "GLE450": 10.0
                },
                "GLS-Class": {
                    "GLS450": 8.5,
                    "GLS580": 8.0
                },
                "C-Class Coupe": {
                    "C200": 10.5,
                    "C300": 10.0
                },
                "E-Class Coupe": {
                    "E200": 10.0,
                    "E300": 9.5
                }
            },
            "Audi": {
                "A3": {
                    "Sportback": 12.0,
                    "Sedan": 11.5
                },
                "A4": {
                    "Sedan": 11.0,
                    "Avant": 10.5
                },
                "A6": {
                    "Sedan": 10.5,
                    "Avant": 10.0
                },
                "A8": {
                    "Sedan": 9.0
                },
                "Q3": {
                    "": 11.0
                },
                "Q5": {
                    "": 10.5
                },
                "Q7": {
                    "": 9.5
                },
                "Q8": {
                    "": 9.0
                }
            },
            "BMW": {
                "3 Series": {
                    "320i": 11.0,
                    "330i": 10.5
                },
                "5 Series": {
                    "520i": 10.5,
                    "530i": 10.0
                },
                "7 Series": {
                    "730i": 9.5,
                    "740i": 9.0
                },
                "X1": {
                    "sDrive18i": 11.5,
                    "sDrive20i": 11.0
                },
                "X3": {
                    "sDrive20i": 11.0,
                    "xDrive20i": 10.5
                },
                "X5": {
                    "sDrive40i": 9.5,
                    "xDrive40i": 9.0
                },
                "4 Series": {
                    "420i Coupe": 10.5,
                    "430i Coupe": 10.0
                },
                "8 Series": {
                    "840i Coupe": 9.5,
                    "850i Coupe": 9.0
                },
                "i3": {
                    "전기": 4.25,
                    "레인지 익스텐더 하이브리드": 16.0
                },
                "330e": {
                    "플러그인 하이브리드": 18.0
                }
            }
        };

        // 차량 리스트를 보여주는 함수
        function showCarList(manufacturer) {
            carList.innerHTML = ''; // 리스트 초기화
            for (const model in carData[manufacturer]) {
                const carModels = carData[manufacturer][model];
                for (const type in carModels) {
                    const fuelEfficiency = carModels[type];
                    const listItem = document.createElement('li');
                    listItem.textContent = `${model} ${type} : ${fuelEfficiency} km/ℓ`;
                    listItem.setAttribute('data-fuel-efficiency', fuelEfficiency);
                    listItem.addEventListener('click', function() {
                        fuelEfficiencyInput.value = fuelEfficiency;
                    });
                    carList.appendChild(listItem);
                }
            }
        }
        // 차량 리스트 항목 클릭 시 다른 항목 숨기기
carList.addEventListener('click', function(event) {
    const clickedListItem = event.target;
    if (clickedListItem.tagName === 'LI') {
        // 모든 리스트 항목 숨기기
        const allListItems = document.querySelectorAll('#carList li');
        allListItems.forEach(item => {
            item.style.display = 'none';
        });
    }
});




        // 연료비 계산 함수
        function calculateFuelCost() {
            const distance = parseFloat(document.getElementById('distance').value);
            const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
            const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
        
            if (!isNaN(distance) && !isNaN(fuelEfficiency) && !isNaN(fuelPrice)) {
                let fuelCost = (distance / fuelEfficiency) * fuelPrice;
                // 소수점 제거
                fuelCost = Math.floor(fuelCost);
                // 10원 단위로 반올림
                fuelCost = Math.round(fuelCost / 10) * 10;
                // 쉼표 추가하여 숫자 표시
                fuelCost = fuelCost.toLocaleString();
                document.getElementById('result').textContent = `주행 비용: ₩ ${fuelCost}`;
            } else {
                alert('올바른 숫자를 입력하세요.');
            }
        }
        
        

        const distanceInput = document.getElementById('distance');
        const add10000Button = document.getElementById('add10000');
        const add1000Button = document.getElementById('add1000');
        const add100Button = document.getElementById('add100');
        const sub100Button = document.getElementById('sub100');
        const sub1000Button = document.getElementById('sub1000');
        const sub10000Button = document.getElementById('sub10000');

        // +10000 버튼 클릭 시
        add10000Button.addEventListener('click', function() {
            adjustDistance(10000);
        });

        // +1000 버튼 클릭 시
        add1000Button.addEventListener('click', function() {
            adjustDistance(1000);
        });

        // +100 버튼 클릭 시
        add100Button.addEventListener('click', function() {
            adjustDistance(100);
        });

        // -100 버튼 클릭 시
        sub100Button.addEventListener('click', function() {
            adjustDistance(-100);
        });

        // -1000 버튼 클릭 시
        sub1000Button.addEventListener('click', function() {
            adjustDistance(-1000);
        });

        // -10000 버튼 클릭 시
        sub10000Button.addEventListener('click', function() {
            adjustDistance(-10000);
        });

        // 주행거리 조정 함수
        function adjustDistance(value) {
            if (!distanceInput.value) {
                distanceInput.value = 0;
            }
            const currentDistance = parseFloat(distanceInput.value);
            if (!isNaN(currentDistance)) {
                distanceInput.value = currentDistance + value;
            }
        }
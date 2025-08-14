 // Movie seat booking functionality
 document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const movieSelect = document.getElementById('movie');

    // Seat prices
    const GOLD_PRICE = 150;
    const SILVER_PRICE = 100;

    // Function to determine if a seat is in Gold or Silver section
    function getSeatPrice(seat) {
        const row = seat.closest('.row');
        const rowLabel = row.querySelector('.row-label').textContent;
        
        // Gold section: rows A-I
        const goldRows = ['A-', 'B-', 'C-', 'D-', 'E-', 'F-', 'G-', 'H-', 'I-'];
        
        if (goldRows.includes(rowLabel)) {
            return GOLD_PRICE;
        } else {
            return SILVER_PRICE; // Silver section: rows J, K, L, M
        }
    }

    // Function to update selected count and total price
    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const selectedSeatsCount = selectedSeats.length;
        
        let totalPrice = 0;
        
        // Calculate total price based on selected seats
        selectedSeats.forEach(seat => {
            totalPrice += getSeatPrice(seat);
        });
        
        // Add movie price if any seats are selected
        if (selectedSeatsCount > 0) {
            const moviePrice = parseInt(movieSelect.value);
            totalPrice += moviePrice * selectedSeatsCount;
        }
        
        count.innerText = selectedSeatsCount;
        total.innerText = totalPrice;
    }

    // Function to get seat info (row and number)
    function getSeatInfo(seat) {
        const row = seat.closest('.row');
        const rowLabel = row.querySelector('.row-label').textContent;
        const seatNumber = seat.innerText;
        return `${rowLabel}${seatNumber}`;
    }

    // Seat click event
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('seat') && 
            !e.target.classList.contains('occupied')) {
            
            e.target.classList.toggle('selected');
            updateSelectedCount();
            
            // Optional: Log selected seat info
            if (e.target.classList.contains('selected')) {
                console.log(`Selected seat: ${getSeatInfo(e.target)}`);
            } else {
                console.log(`Deselected seat: ${getSeatInfo(e.target)}`);
            }
        }
    });

    // Movie selection change event
    movieSelect.addEventListener('change', (e) => {
        updateSelectedCount();
    });

    // Time slot button functionality
    const timeButtons = document.querySelectorAll('.btn');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            console.log(`Selected time: ${this.textContent.trim()}`);
        });
    });

    // Function to get all selected seats info
    function getSelectedSeatsInfo() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        const seatsInfo = [];
        
        selectedSeats.forEach(seat => {
            const seatInfo = {
                position: getSeatInfo(seat),
                price: getSeatPrice(seat),
                category: getSeatPrice(seat) === GOLD_PRICE ? 'Gold' : 'Silver'
            };
            seatsInfo.push(seatInfo);
        });
        
        return seatsInfo;
    }

    // Function to clear all selections
    function clearSelection() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
        });
        updateSelectedCount();
    }

    // Expose functions globally for potential external use
    window.seatBooking = {
        getSelectedSeatsInfo: getSelectedSeatsInfo,
        clearSelection: clearSelection,
        updateSelectedCount: updateSelectedCount
    };

    // Initialize display
    updateSelectedCount();
});
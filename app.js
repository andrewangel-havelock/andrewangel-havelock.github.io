document.addEventListener('DOMContentLoaded', () => {
    // Data
    const jsonData = [
        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "1",
            "Uplift": "05:30",
            "Offload": "06:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "32",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "2",
            "Uplift": "07:00",
            "Offload": "10:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Quantity": "30",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "2",
            "Uplift": "07:00",
            "Offload": "10:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Final Delivery": "KAIKOURA",
            "Quantity": "20",
            "Package": "Case",
            "Type": "CHILLED",
            "Goods": "CASES OF FISH"
        },
        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "3",
            "Uplift": "10:30",
            "Offload": "11:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "32",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "3",
            "Uplift": "13:00",
            "Offload": "16:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Quantity": "18",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "5",
            "Uplift": "14:00",
            "Offload": "15:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "32",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        }
    ];

    const dropoffs = [

        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "6",
            "Uplift": "14:00",
            "Offload": "15:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "28",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "2",
            "Uplift": "07:00",
            "Offload": "10:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Quantity": "30",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "2",
            "Uplift": "07:00",
            "Offload": "10:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Final Delivery": "KAIKOURA",
            "Quantity": "20",
            "Package": "Case",
            "Type": "CHILLED",
            "Goods": "CASES OF FISH"
        },
        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "3",
            "Uplift": "10:30",
            "Offload": "06:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "32",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "STEVE BLAIR",
            "load": "3",
            "Uplift": "13:00",
            "Offload": "06:00",
            "Shipper": "TALLEYS MOTUEKA",
            "Quantity": "18",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        },
        {
            "Date": "2/6/2025",
            "driver": "JASON WHALE",
            "load": "5",
            "Uplift": "14:00",
            "Offload": "15:30",
            "Shipper": "TALLEYS BLENHEIM",
            "Quantity": "32",
            "Package": "Bag",
            "Type": "CHILLED",
            "Goods": "BAGS OF MUSSELS"
        }
    ];

    const boatEtas = [
        {
            "boatName": "Miro",
            "eta": "20:00",
            "status": "Expected"
        },
        {
            "boatName": "Resolution",
            "eta": "23:00",
            "status": "Expected"
        }
    ];

    // Elements
    const loadsTableBody = document.getElementById('loads-table-body');
    const unloadsTableBody = document.getElementById('unloads-table-body');
    const etasList = document.getElementById('etas-list');
    const dateHeading = document.getElementById('date');

    // Date Formatting
    const currentDate = new Date();
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    dateHeading.textContent = formattedDate;

    // Helper Functions
    function createTableRow(item, isLoad) {
        const row = document.createElement('tr');
        const timeString = isLoad? item.Uplift: item.Offload;
        const scheduledTime = new Date(`2025-02-06T${timeString}`);

        // Store scheduled time and completion state
        row.dataset.scheduledTime = scheduledTime.getTime();
        row.dataset.completed = "false";

        // Add click handler for completion toggle
        row.addEventListener('click', function () {
            const isCompleted = this.classList.toggle('completed');
            this.dataset.completed = isCompleted.toString();
            updatePastDueStatus(this);
        });

        // Initial past-due check
        updatePastDueStatus(row);

        return row;
    }

    function updatePastDueStatus(row) {
        const scheduledTime = parseInt(row.dataset.scheduledTime);
        const isCompleted = row.dataset.completed === "true";
        const isPastDue = Date.now() > scheduledTime;

        row.classList.toggle('past-due',!isCompleted && isPastDue);
    }

    function adjustScrollPosition(tableId) {
        const wrapper = document.querySelector(`#${tableId}`).closest('.table-wrapper');
        const nextTrip = wrapper.querySelector('.next-trip');
        if (!nextTrip) return;

        const rowHeight = nextTrip.offsetHeight;
        wrapper.scrollTop = Math.max(0, nextTrip.offsetTop - rowHeight * 1.5);
    }

    // Data Processing and Display
    const currentTime = new Date();

    // Loads
    const todaysLoads = jsonData
      .filter(load => load.Date === "2/6/2025")
      .sort((a, b) => new Date(`2025-02-06T${a.Uplift}`) - new Date(`2025-02-06T${b.Uplift}`));

    let nextTripFoundLoads = false;
    todaysLoads.forEach(load => {
        const row = createTableRow(load, true);
        const loadTime = new Date(`2025-02-06T${load.Uplift}`);

        // Set initial completion state
        if (loadTime < currentTime) {
            row.classList.add('completed');
            row.dataset.completed = "true";
        }

        // Next trip highlighting
        if (!nextTripFoundLoads && loadTime >= currentTime) {
            row.classList.add('next-trip');
            nextTripFoundLoads = true;
        }

        // Populate row content
        row.innerHTML = `
            <td class="time-col">
                <span class="time-top">${load.Uplift.substring(0, 2)}</span>
                <span class="time-bottom">${load.Uplift.substring(3)}</span>
            </td>
            <td class="driver-info">
                <span class="driver-name">${load.driver}</span>
                <span class="driver-goods">${load.Goods.replace('BAGS OF ', '').replace('CASES OF ', '')}</span>
            </td>
            <td class="quantity-shipper">
                <div class="quantity-shipper-top">${load.Quantity}</div>
                <span class="shipper">${load.Shipper.replace('TALLEYS ', '')}</span>
            </td>
        `;
        loadsTableBody.appendChild(row);
    });

    // Unloads
    const todaysUnLoads = dropoffs
      .filter(unload => unload.Date === "2/6/2025")
      .sort((a, b) => new Date(`2025-02-06T${a.Offload}`) - new Date(`2025-02-06T${b.Offload}`));

    let nextTripFoundUnloads = false;
    todaysUnLoads.forEach(unload => {
        const row = createTableRow(unload, false);
        const unloadTime = new Date(`2025-02-06T${unload.Offload}`);

        if (unloadTime < currentTime) {
            row.classList.add('completed');
            row.dataset.completed = "true";
        }

        if (!nextTripFoundUnloads && unloadTime >= currentTime) {
            row.classList.add('next-trip');
            nextTripFoundUnloads = true;
        }

        row.innerHTML = `
            <td class="time-col">
                <span class="time-top">${unload.Offload.substring(0, 2)}</span>
                <span class="time-bottom">${unload.Offload.substring(3)}</span>
            </td>
            <td class="driver-info">
                <span class="driver-name">${unload.driver}</span>
                <span class="driver-goods">${unload.Goods.replace('BAGS OF ', '').replace('CASES OF ', '')}</span>
            </td>
            <td class="quantity-shipper">
                <div class="quantity-shipper-top">${unload.Quantity}</div>
                <span class="shipper">${unload.Shipper.replace('TALLEYS ', '')}</span>
            </td>
        `;
        unloadsTableBody.appendChild(row);
    });

    // Adjust Table Scroll Position
    adjustScrollPosition('loads-table');
    adjustScrollPosition('unloads-table');

    // Boat ETAs
    boatEtas.forEach(eta => {
        const div = document.createElement('div');
        div.classList.add('eta-item');
        div.innerHTML = `
            <span>${eta.boatName}</span>
            <span>${eta.eta} (${eta.status})</span>
        `;
        etasList.appendChild(div);
    });
});

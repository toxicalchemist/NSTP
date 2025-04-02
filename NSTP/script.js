function openTrade(item) {
    document.getElementById('trade-title').textContent = `Trade ${item}`;
    document.getElementById('trade-section').classList.remove('hidden');
}
function convertTrade() {
    let weight = document.getElementById("weight").value;
    let equivalent = "";
    let itemImage = "images/recyclables.png";
    let equivalentImage = "";

    switch(weight) {
        case "4-5":
            equivalent = "1 Kilo Good Soil";
            equivalentImage = "images/good_soil.png";
            break;
        case "3-4":
            equivalent = "1 Kilo Coco Fiber / Rice Hull";
            equivalentImage = "images/rice_hull.png";
            break;
        case "2-3":
            equivalent = "Vermitea / Liquid Fertilizer";
            equivalentImage = "images/vermitea.png";
            break;
        case "less2":
            equivalent = "1 Eco Bag OR 1 Eco Rag";
            equivalentImage = "images/eco_bag.png";
            break;
        default:
            equivalent = "Select weight";
            equivalentImage = "images/default.png";
    }

    document.getElementById("equivalent").textContent = equivalent;
    document.getElementById("tradeImage").src = itemImage;
    document.getElementById("equivalentImage").src = equivalentImage;
}

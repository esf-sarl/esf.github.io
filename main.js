// Données des réalisations (simulées - en production, utiliser une API)
const realisations = [
    {
        id: 1,
        titre: "Étude d'impact - Autoroute A45",
        description: "Étude d'impact environnemental pour le projet d'autoroute A45 entre Lyon et Saint-Étienne.",
        categorie: "environnement",
        image: "autoroute.jpg"
    },
    {
        id: 2,
        titre: "Pont sur la Garonne",
        description: "Conception et études techniques pour un nouveau pont sur la Garonne à Toulouse.",
        categorie: "ponts",
        image: "pont-garonne.jpg"
    },
    {
        id: 3,
        titre: "Aménagement routier - Nantes",
        description: "Réaménagement complet du boulevard périphérique de Nantes.",
        categorie: "routes",
        image: "route-nantes.jpg"
    },
    {
        id: 4,
        titre: "Ligne TGV Lyon-Turin",
        description: "Études d'impact pour la section française de la ligne Lyon-Turin.",
        categorie: "environnement",
        image: "tgv-lyon-turin.jpg"
    },
    {
        id: 5,
        titre: "Viaduc de Millau - Études complémentaires",
        description: "Études techniques pour l'élargissement des voies d'accès au viaduc.",
        categorie: "ponts",
        image: "viaduc-millau.jpg"
    },
    {
        id: 6,
        titre: "Rocade de Bordeaux",
        description: "Conception de la nouvelle rocade ouest de Bordeaux.",
        categorie: "routes",
        image: "rocade-bordeaux.jpg"
    }
];

// Charger les 3 dernières réalisations sur la page d'accueil
function loadLastProjects() {
    const galleryGrid = document.querySelector('.last-projects .gallery-grid');
    if (galleryGrid) {
        const lastProjects = realisations.slice(0, 3);
        
        lastProjects.forEach(projet => {
            const projectItem = document.createElement('div');
            projectItem.className = 'gallery-item';
            projectItem.innerHTML = `
                <img src="images/uploads/${projet.image}" alt="${projet.titre}">
                <div class="overlay">
                    <h3>${projet.titre}</h3>
                    <p>${projet.categorie.charAt(0).toUpperCase() + projet.categorie.slice(1)}</p>
                </div>
            `;
            galleryGrid.appendChild(projectItem);
        });
    }
}

// Charger toutes les réalisations avec filtrage
function loadAllProjects() {
    const galleryGrid = document.querySelector('.realisations-content .gallery-grid');
    if (galleryGrid) {
        // Vider la galerie
        galleryGrid.innerHTML = '';
        
        // Filtrer si un filtre est actif
        const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter;
        const filteredProjects = activeFilter === 'all' 
            ? realisations 
            : realisations.filter(p => p.categorie === activeFilter);
        
        // Ajouter les projets filtrés
        filteredProjects.forEach(projet => {
            const projectItem = document.createElement('div');
            projectItem.className = 'gallery-item';
            projectItem.dataset.category = projet.categorie;
            projectItem.innerHTML = `
                <img src="images/uploads/${projet.image}" alt="${projet.titre}">
                <div class="overlay">
                    <h3>${projet.titre}</h3>
                    <p>${projet.description}</p>
                </div>
            `;
            galleryGrid.appendChild(projectItem);
        });
    }
}

// Gestion des filtres
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                // Recharger les projets avec le nouveau filtre
                loadAllProjects();
            });
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadLastProjects();
    loadAllProjects();
    setupFilters();
});
// Données des réalisations (simulées - en production, utiliser une API)
let realisations = [
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
    }
];

// Charger la galerie existante
function loadGallery() {
    const galleryList = document.getElementById('gallery-list');
    if (galleryList) {
        galleryList.innerHTML = '';
        
        realisations.forEach(projet => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="images/uploads/${projet.image}" alt="${projet.titre}">
                <div class="actions">
                    <span>${projet.titre}</span>
                    <span class="delete-btn" data-id="${projet.id}">
                        <i class="fas fa-trash"></i>
                    </span>
                </div>
            `;
            galleryList.appendChild(galleryItem);
        });
        
        // Ajouter les événements de suppression
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                deleteProject(id);
            });
        });
    }
}

// Supprimer un projet
function deleteProject(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
        realisations = realisations.filter(p => p.id !== id);
        loadGallery();
        alert('Réalisation supprimée avec succès !');
    }
}

// Ajouter une nouvelle réalisation
function setupAddForm() {
    const form = document.getElementById('add-realisation');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const titre = document.getElementById('titre').value;
            const description = document.getElementById('description').value;
            const categorie = document.getElementById('categorie').value;
            const imageInput = document.getElementById('image');
            
            // Simuler l'upload de l'image (en production, utiliser FormData et une API)
            const imageFile = imageInput.files[0];
            const imageName = imageFile ? `projet-${Date.now()}-${imageFile.name}` : 'default.jpg';
            
            // Créer un nouveau projet
            const newProject = {
                id: realisations.length > 0 ? Math.max(...realisations.map(p => p.id)) + 1 : 1,
                titre,
                description,
                categorie,
                image: imageName
            };
            
            // Ajouter au tableau (en production, envoyer à l'API)
            realisations.unshift(newProject);
            
            // Recharger la galerie
            loadGallery();
            
            // Réinitialiser le formulaire
            form.reset();
            
            // Message de succès
            alert('Nouvelle réalisation ajoutée avec succès !');
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
    setupAddForm();
});
export interface PhotoCredit { title: string; author: string; license: string; licenseUrl: string; source: string }

/** Photos from Wikimedia Commons used on the home page. Keep these credits visible. */
export const photoCredits: Record<string, PhotoCredit> = {
  "canada": {
    "title": "Moraine Lake 17092005.jpg",
    "author": "Gorgo",
    "license": "Public domain",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/wiki/File:Moraine_Lake_17092005.jpg"
  },
  "australia": {
    "title": "Sydney Opera House and Harbour Bridge, southeast view 20230224 1.jpg",
    "author": "DXR",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_and_Harbour_Bridge,_southeast_view_20230224_1.jpg"
  },
  "united-kingdom": {
    "title": "Big Ben - 04.jpg",
    "author": "Carlos Delgado",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Big_Ben_-_04.jpg"
  },
  "germany": {
    "title": "Brandenburg Gate - Brandenburger Tor - Berlin - Germany - 01.jpg",
    "author": "Norbert Nagel",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Brandenburg_Gate_-_Brandenburger_Tor_-_Berlin_-_Germany_-_01.jpg"
  },
  "new-zealand": {
    "title": "Milford Sound in Fiordland National Park 01.jpg",
    "author": "Krzysztof Golik",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Milford_Sound_in_Fiordland_National_Park_01.jpg"
  },
  "caribbean": {
    "title": "The Pitons at Soufriere Saint Lucia.jpg",
    "author": "",
    "license": "Public domain",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/wiki/File:The_Pitons_at_Soufriere_Saint_Lucia.jpg"
  },
  "united-states": {
    "title": "Statue of Liberty frontal 2 crop.JPG",
    "author": "Daniel Schwen",
    "license": "Public domain",
    "licenseUrl": "",
    "source": "https://commons.wikimedia.org/wiki/File:Statue_of_Liberty_frontal_2_crop.JPG"
  },
  "european-union": {
    "title": "Grand-Place (Brussels) - View of the Brussels Town Hall and adjacent Baroque guildhouses.jpg",
    "author": "iMahesh",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Grand-Place_(Brussels)_-_View_of_the_Brussels_Town_Hall_and_adjacent_Baroque_guildhouses.jpg"
  },
  "portugal": {
    "title": "Torre de Belém por Rodrigo Tetsuo Argenton (2).jpg",
    "author": "Rodrigo.Argenton",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Torre_de_Bel%C3%A9m_por_Rodrigo_Tetsuo_Argenton_(2).jpg"
  }
};

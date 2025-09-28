        // Custom cursor removed - using default browser cursor

        // Generate Particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Parallax on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const auroras = document.querySelectorAll('.aurora-bg');
            auroras.forEach(aurora => {
                aurora.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 1s ease forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.destination-card, .exp-card, .stat-box').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll for nav cards
        document.querySelectorAll('.nav-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const sections = ['.gallery', '.map-section'];
                const target = document.querySelector(sections[index] || 'body');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Add glow effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            document.querySelectorAll('.aurora-bg').forEach(aurora => {
                aurora.style.background = `linear-gradient(${45 + x * 90}deg, var(--sunset-orange), var(--sunset-pink), var(--sunset-purple))`;
            });
        });

        // Journey Map Data and Functions
        let currentJourneyDay = 1; // Currently at Maine - the beginning of the journey

        const journeyLocations = [
            {
                id: 1,
                state: "Maine",
                name: "Cadillac Mountain",
                address: "Cadillac Mountain, Bar Harbor, ME 04609",
                coordinates: [-68.2251, 44.3527],
                driveTime: "0",
                hikeTime: "0",
                visitDate: "September 29, 2025",
                description: "First light in America - the journey begins at the highest point along the North Atlantic seaboard"
            },
            {
                id: 2,
                state: "New Hampshire",
                name: "Mount Washington",
                address: "Mt Washington, Sargent's Purchase, NH 03846",
                coordinates: [-71.3032, 44.2706],
                driveTime: "2h 46min",
                hikeTime: "0",
                visitDate: "September 30, 2025",
                description: "Above the clouds on the Northeast's highest peak"
            },
            {
                id: 3,
                state: "Vermont",
                name: "Stowe Pinnacle",
                address: "Stowe Pinnacle Trailhead, Stowe, VT 05672",
                coordinates: [-72.7103, 44.4669],
                driveTime: "2h 52min",
                hikeTime: "1h",
                visitDate: "October 1, 2025",
                description: "Vermont's Green Mountains painted in sunset colors"
            },
            {
                id: 4,
                state: "New York",
                name: "Whiteface Mountain",
                address: "Whiteface Mountain, Wilmington, NY 12997",
                coordinates: [-73.9026, 44.3659],
                driveTime: "2h 41min",
                hikeTime: "5min",
                visitDate: "October 2, 2025",
                description: "Adirondack wilderness and Olympic history"
            },
            {
                id: 5,
                state: "Massachusetts",
                name: "Cape Cod",
                address: "Province Lands Rd, Provincetown, MA 02657",
                coordinates: [-70.1873, 42.0584],
                driveTime: "7h",
                hikeTime: "0",
                visitDate: "September 30, 2025",
                description: "Atlantic Ocean sunset at the tip of Cape Cod"
            },
            {
                id: 6,
                state: "Rhode Island",
                name: "Newport",
                address: "Beavertail Rd, Jamestown, RI 02835",
                coordinates: [-71.3977, 41.4510],
                driveTime: "1h 30min",
                hikeTime: "0",
                visitDate: "October 1, 2025",
                description: "Ocean State's dramatic coastal mansions and lighthouse views"
            },
            {
                id: 7,
                state: "Connecticut",
                name: "Hammonasset Beach",
                address: "Hammonasset Beach, Connecticut 06443",
                coordinates: [-72.5481, 41.2787],
                driveTime: "1h 45min",
                hikeTime: "0",
                visitDate: "October 2, 2025",
                description: "Constitution State's longest shoreline with Long Island Sound views"
            },
            {
                id: 8,
                state: "New Jersey",
                name: "Interstate 80",
                address: "Interstate 80 East Scenic Lookout, Hackettstown, NJ 07840",
                coordinates: [-74.8279, 40.8584],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "October 3, 2025",
                description: "Garden State scenic overlook along the historic highway"
            },
            {
                id: 9,
                state: "Delaware",
                name: "Tower Road",
                address: "Tower Rd Bayside, 38917 Tower Bay Rd, Rehoboth Beach, DE 19971",
                coordinates: [-75.1085, 38.6990],
                driveTime: "2h",
                hikeTime: "0",
                visitDate: "October 4, 2025",
                description: "First State's hidden scenic viewpoint and countryside"
            },
            {
                id: 10,
                state: "Pennsylvania",
                name: "The Pinnacle",
                address: "The Pinnacle Overlook, 127 Pinnacle Rd W, Holtwood, PA 17532",
                coordinates: [-76.3433, 39.8237],
                driveTime: "2h 30min",
                hikeTime: "1h 30min",
                visitDate: "October 5, 2025",
                description: "Appalachian Trail's spectacular overlook of the Schuylkill River valley"
            },
            {
                id: 11,
                state: "Maryland",
                name: "Zumburn Overlook",
                address: "Zumbrun Overlook, Flintstone, MD 21530",
                coordinates: [-78.6127, 39.6954],
                driveTime: "2h",
                hikeTime: "30min",
                visitDate: "October 6, 2025",
                description: "Old Line State's hidden gem with panoramic Potomac River views"
            },
            {
                id: 12,
                state: "Ohio",
                name: "Vermillion Lighthouse",
                address: "480 Main St, Vermilion, OH 44089",
                coordinates: [-82.3657, 41.4217],
                driveTime: "4h 30min",
                hikeTime: "0",
                visitDate: "October 7, 2025",
                description: "Great Lakes sunset with historic lighthouse silhouette"
            },
            {
                id: 13,
                state: "Michigan",
                name: "Sleeping Bear Dunes",
                address: "Sleeping Bear Dunes, MI 49660",
                coordinates: [-86.0581, 44.8834],
                driveTime: "4h",
                hikeTime: "1h 30min",
                visitDate: "October 8, 2025",
                description: "Great Lakes State's massive sand dunes and Lake Michigan"
            },
            {
                id: 14,
                state: "Indiana",
                name: "Indiana Dunes",
                address: "Indiana Dunes National Park, IN 46304",
                coordinates: [-87.0524, 41.6533],
                driveTime: "2h 30min",
                hikeTime: "0",
                visitDate: "October 9, 2025",
                description: "Hoosier State's Lake Michigan shoreline and towering dunes"
            },
            {
                id: 15,
                state: "Wisconsin",
                name: "Buena Vista Park",
                address: "Buena Vista Park, Alma, WI 54610",
                coordinates: [-91.9182, 44.3316],
                driveTime: "4h",
                hikeTime: "30min",
                visitDate: "October 10, 2025",
                description: "Badger State's Mississippi River bluff overlook"
            },
            {
                id: 16,
                state: "Minnesota",
                name: "Millie Lacs Lake",
                address: "Mille Lacs Lake, Minnesota",
                coordinates: [-93.6633, 46.2041],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "October 11, 2025",
                description: "Land of 10,000 Lakes' pristine waters and endless horizons"
            },
            {
                id: 17,
                state: "Iowa",
                name: "High Trestle Trail Bridge",
                address: "High Trestle Trail Bridge, Madrid, IA 50156",
                coordinates: [-93.8191, 41.8780],
                driveTime: "5h",
                hikeTime: "0",
                visitDate: "October 12, 2025",
                description: "Hawkeye State's iconic illuminated bridge over the Des Moines River"
            },
            {
                id: 18,
                state: "Illinois",
                name: "Shawnee National Forest",
                address: "Shawnee National Forest, Illinois",
                coordinates: [-88.5403, 37.4477],
                driveTime: "6h",
                hikeTime: "0",
                visitDate: "October 13, 2025",
                description: "Southern Illinois rock formations frame the sunset"
            },
            {
                id: 19,
                state: "Kentucky",
                name: "Chimney Top Rock",
                address: "Chimney Top Rock, Red River Gorge, KY",
                coordinates: [-83.6816, 37.8344],
                driveTime: "3h",
                hikeTime: "45min",
                visitDate: "October 14, 2025",
                description: "Bluegrass State's dramatic sandstone arch and forest views"
            },
            {
                id: 20,
                state: "West Virginia",
                name: "New River Gorge",
                address: "New River Gorge Bridge, Fayetteville, WV 25840",
                coordinates: [-81.0784, 38.0702],
                driveTime: "2h 30min",
                hikeTime: "1h",
                visitDate: "October 15, 2025",
                description: "Mountain State's iconic bridge and whitewater canyon"
            },
            {
                id: 21,
                state: "Virginia",
                name: "McAfee Knob",
                address: "McAfee Knob, Salem, VA 24153",
                coordinates: [-80.0781, 37.3783],
                driveTime: "2h",
                hikeTime: "2h",
                visitDate: "October 16, 2025",
                description: "Old Dominion's most photographed spot on the Appalachian Trail"
            },
            {
                id: 22,
                state: "Tennessee",
                name: "Cliff Tops",
                address: "Cliff Tops, Monteagle, TN 37356",
                coordinates: [-85.8397, 35.2431],
                driveTime: "3h",
                hikeTime: "1h",
                visitDate: "October 17, 2025",
                description: "Volunteer State's dramatic Cumberland Plateau overlook"
            },
            {
                id: 23,
                state: "North Carolina",
                name: "Max Patch",
                address: "Max Patch, NC 28779",
                coordinates: [-82.9626, 35.7965],
                driveTime: "2h 30min",
                hikeTime: "30min",
                visitDate: "October 18, 2025",
                description: "Tar Heel State's 360-degree mountain views from grassy bald"
            },
            {
                id: 24,
                state: "South Carolina",
                name: "Jumping Rock",
                address: "Jumping Rock, Highlands, SC",
                coordinates: [-82.6171, 35.0445],
                driveTime: "1h 30min",
                hikeTime: "15min",
                visitDate: "October 19, 2025",
                description: "Palmetto State's thrilling cliff edge with mountain vistas"
            },
            {
                id: 25,
                state: "Georgia",
                name: "Bell Mountain",
                address: "Bell Mountain, Hiawassee, GA 30546",
                coordinates: [-83.7577, 34.9498],
                driveTime: "1h",
                hikeTime: "1h",
                visitDate: "October 20, 2025",
                description: "Peach State's hidden summit with Blue Ridge mountain panorama"
            },
            {
                id: 26,
                state: "Florida",
                name: "Panama City Beach",
                address: "Panama City Beach, FL",
                coordinates: [-85.8074, 30.1766],
                driveTime: "6h",
                hikeTime: "0",
                visitDate: "October 21, 2025",
                description: "Emerald Coast sunset over the Gulf of Mexico"
            },
            {
                id: 27,
                state: "Alabama",
                name: "Gulf Shores",
                address: "Gulf Shores, AL 36542",
                coordinates: [-87.7008, 30.2460],
                driveTime: "2h",
                hikeTime: "0",
                visitDate: "October 22, 2025",
                description: "Heart of Dixie's sugar-white sand beaches on the Gulf"
            },
            {
                id: 28,
                state: "Mississippi",
                name: "Natchez Bluff",
                address: "Natchez Bluff, Natchez, MS 39120",
                coordinates: [-91.4032, 31.5604],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "October 23, 2025",
                description: "Magnolia State's historic bluffs overlooking the mighty Mississippi"
            },
            {
                id: 29,
                state: "Louisiana",
                name: "Caddo Lake",
                address: "Caddo Lake, Louisiana",
                coordinates: [-94.0084, 32.6725],
                driveTime: "4h",
                hikeTime: "0",
                visitDate: "October 24, 2025",
                description: "Mystical swampland cypress trees silhouetted at sunset"
            },
            {
                id: 30,
                state: "Arkansas",
                name: "Petit Jean State Park",
                address: "Petit Jean State Park, AR 72851",
                coordinates: [-92.9046, 35.1088],
                driveTime: "3h",
                hikeTime: "45min",
                visitDate: "October 25, 2025",
                description: "Natural State's first state park and Cedar Falls"
            },
            {
                id: 31,
                state: "Missouri",
                name: "Top of the Rock",
                address: "Top of the Rock, Branson, MO 65616",
                coordinates: [-93.2835, 36.6059],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "October 26, 2025",
                description: "Show-Me State's premier golf course with Ozark mountain views"
            },
            {
                id: 32,
                state: "Oklahoma",
                name: "Tallgrass",
                address: "Tallgrass Prairie Preserve, OK 74001",
                coordinates: [-96.4169, 36.8450],
                driveTime: "4h",
                hikeTime: "0",
                visitDate: "October 27, 2025",
                description: "Sooner State's endless prairie grasslands under big sky"
            },
            {
                id: 33,
                state: "Kansas",
                name: "Sunflower Mountain",
                address: "Mount Sunflower, KS 67665",
                coordinates: [-102.0377, 39.0219],
                driveTime: "6h",
                hikeTime: "0",
                visitDate: "October 28, 2025",
                description: "Sunflower State's highest point amid endless wheat fields"
            },
            {
                id: 34,
                state: "Texas",
                name: "Guadalupe Peak",
                address: "Guadalupe Peak, TX 79847",
                coordinates: [-104.8607, 31.8913],
                driveTime: "8h",
                hikeTime: "2h",
                visitDate: "October 29, 2025",
                description: "Highest point in Texas with endless desert vistas"
            },
            {
                id: 35,
                state: "New Mexico",
                name: "White Sands",
                address: "White Sands National Park, NM",
                coordinates: [-106.1711, 32.7872],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "October 30, 2025",
                description: "Pristine white gypsum dunes create an otherworldly sunset"
            },
            {
                id: 36,
                state: "Arizona",
                name: "Monument Valley",
                address: "Monument Valley, AZ 84536",
                coordinates: [-110.1735, 36.9869],
                driveTime: "8h",
                hikeTime: "0",
                visitDate: "October 31, 2025",
                description: "Iconic red sandstone buttes define the American Southwest"
            },
            {
                id: 37,
                state: "Colorado",
                name: "Last Dollar Road",
                address: "Last Dollar Rd, Colorado",
                coordinates: [-107.9132, 37.9578],
                driveTime: "4h 20min",
                hikeTime: "0",
                visitDate: "November 1, 2025",
                description: "Fall aspens and snow-capped peaks in the Rockies"
            },
            {
                id: 38,
                state: "Utah",
                name: "Green River Overlook",
                address: "Green River Overlook, Canyonlands National Park, UT",
                coordinates: [-109.9225, 38.3186],
                driveTime: "5h",
                hikeTime: "30min",
                visitDate: "November 2, 2025",
                description: "Beehive State's dramatic canyon vistas and winding river"
            },
            {
                id: 39,
                state: "Wyoming",
                name: "Grand Teton",
                address: "Grand Teton National Park, WY 82190",
                coordinates: [-110.8021, 43.7904],
                driveTime: "6h",
                hikeTime: "0",
                visitDate: "November 3, 2025",
                description: "Majestic mountain reflections in pristine alpine lakes"
            },
            {
                id: 40,
                state: "Nebraska",
                name: "Chimney Rock",
                address: "Chimney Rock, NE 69341",
                coordinates: [-103.3003, 41.7033],
                driveTime: "4h",
                hikeTime: "0",
                visitDate: "November 4, 2025",
                description: "Cornhusker State's iconic Oregon Trail landmark"
            },
            {
                id: 41,
                state: "South Dakota",
                name: "Badlands",
                address: "Badlands National Park, SD 57750",
                coordinates: [-102.3378, 43.8554],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "November 5, 2025",
                description: "Mount Rushmore State's otherworldly landscape and fossil beds"
            },
            {
                id: 42,
                state: "North Dakota",
                name: "Theodore Roosevelt",
                address: "Theodore Roosevelt National Park, ND 58645",
                coordinates: [-103.4387, 46.9788],
                driveTime: "5h",
                hikeTime: "0",
                visitDate: "November 6, 2025",
                description: "Peace Garden State's badlands and painted canyons"
            },
            {
                id: 43,
                state: "Montana",
                name: "Wild Goose Island",
                address: "Wild Goose Island, MT 59417",
                coordinates: [-113.5360, 48.6966],
                driveTime: "6h",
                hikeTime: "0",
                visitDate: "November 7, 2025",
                description: "Glacier National Park's most photographed location"
            },
            {
                id: 44,
                state: "Idaho",
                name: "Chilco Mountain",
                address: "Chilco Mountain, Idaho",
                coordinates: [-115.0731, 43.7185],
                driveTime: "7h",
                hikeTime: "2h",
                visitDate: "November 8, 2025",
                description: "Gem State's remote peak with endless wilderness views"
            },
            {
                id: 45,
                state: "Washington",
                name: "Tolmie Peak",
                address: "Tolmie Peak, Mount Rainier National Park, WA",
                coordinates: [-121.8450, 46.9069],
                driveTime: "5h",
                hikeTime: "2h 30min",
                visitDate: "November 9, 2025",
                description: "Evergreen State's stunning Mount Rainier and alpine lake views"
            },
            {
                id: 46,
                state: "Oregon",
                name: "Cannon Beach",
                address: "Cannon Beach, OR",
                coordinates: [-123.9615, 45.8917],
                driveTime: "3h",
                hikeTime: "0",
                visitDate: "November 10, 2025",
                description: "Pacific Coast's iconic Haystack Rock at golden hour"
            },
            {
                id: 47,
                state: "Nevada",
                name: "Lake Tahoe",
                address: "Lake Tahoe, Nevada",
                coordinates: [-119.9772, 39.0968],
                driveTime: "8h",
                hikeTime: "0",
                visitDate: "November 11, 2025",
                description: "Silver State's pristine alpine lake surrounded by snow-capped peaks"
            },
            {
                id: 48,
                state: "California",
                name: "Hawk Hill",
                address: "Hawk Hill, CA 94941",
                coordinates: [-122.4994, 37.8255],
                driveTime: "4h",
                hikeTime: "0",
                visitDate: "November 12, 2025",
                description: "Golden Gate Bridge wrapped in San Francisco fog"
            },
            {
                id: 49,
                state: "Alaska",
                name: "Ten Mile Hill",
                address: "Ten Mile Hill, Alaska",
                coordinates: [-149.8940, 61.2181],
                driveTime: "0",
                flightTime: "4h",
                hikeTime: "15min",
                visitDate: "November 13, 2025",
                description: "Last frontier wilderness with endless mountain views"
            },
            {
                id: 50,
                state: "Hawaii",
                name: "Haleakala",
                address: "Haleakala National Park, Maui, HI",
                coordinates: [-156.1733, 20.7012],
                driveTime: "1h",
                flightTime: "8h",
                hikeTime: "0",
                visitDate: "November 14, 2025",
                description: "Above the clouds at the House of the Sun - journey's end"
            }
        ];

        // Environment variable support for Netlify configuration
        const DAYS_TO_SHOW = parseInt(window.DAYS_TO_SHOW || 3); // Default: 3 days
        const START_DATE_OVERRIDE = window.START_DATE_OVERRIDE || '2025-09-29'; // Default: September 29, 2025 (journey beginning)
        const ENABLE_LIMITED_VIEW = window.ENABLE_LIMITED_VIEW !== 'false'; // Default: true, set to 'false' to show all 50 destinations
        const ENABLE_COMING_SOON = window.ENABLE_COMING_SOON !== 'false'; // Default: true, set to 'false' to disable mystery last destination

        // Date filtering logic
        function parseVisitDate(visitDateString) {
            // Convert "September 26, 2025" to Date object
            const [month, day, year] = visitDateString.replace(',', '').split(' ');
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = monthNames.indexOf(month);
            return new Date(parseInt(year), monthIndex, parseInt(day));
        }

        function getJourneyStartDate() {
            // Always use the fixed start date for consistent experience
            return new Date(START_DATE_OVERRIDE);
        }

        function isWithinJourneyWindow(visitDate, daysFromStart = DAYS_TO_SHOW) {
            const journeyStart = getJourneyStartDate();
            const startDate = new Date(journeyStart); // Journey starting point

            const endDate = new Date(journeyStart);
            endDate.setDate(journeyStart.getDate() + daysFromStart); // Start + next 3 days

            return visitDate >= startDate && visitDate <= endDate;
        }

        // Create a mystery "Coming Soon" destination object
        function createComingSoonDestination(nextActualDestination) {
            const mysteryMessages = [
                "The next adventure awaits...",
                "A hidden gem yet to be revealed...",
                "Mystery destination unlocking soon...",
                "Adventure continues tomorrow...",
                "Next destination is a surprise...",
                "The journey's next chapter...",
                "Another breathtaking location awaits...",
                "Discovering America, one day at a time..."
            ];

            // Smart mystery coordinates: Use actual next destination as base with offset
            const [baseLng, baseLat] = nextActualDestination.coordinates;

            // Create deterministic but obscured offset using destination ID as seed
            const seed = nextActualDestination.id * 12345; // Simple seed multiplication
            const offsetLng = ((seed % 100) / 100 - 0.5) * 0.8; // ±0.4 degrees longitude (~20-30 miles)
            const offsetLat = ((seed % 73) / 73 - 0.5) * 0.6;   // ±0.3 degrees latitude (~20-25 miles)

            const mysteryCoordinates = [
                baseLng + offsetLng,
                baseLat + offsetLat
            ];

            return {
                id: nextActualDestination.id,
                state: "Coming Soon",
                name: "Mystery Destination",
                address: "Somewhere in America",
                coordinates: mysteryCoordinates,
                driveTime: "?",
                hikeTime: "?",
                visitDate: "Soon",
                description: mysteryMessages[Math.floor(Math.random() * mysteryMessages.length)],
                isComingSoon: true // Special flag to identify mystery destinations
            };
        }

        function getFilteredLocations() {
            // Progressive reveal logic: show more destinations as days pass
            const journeyStart = getJourneyStartDate(); // Sept 29, 2025

            // Use test date override if available, otherwise use actual current date
            const today = window.TEST_DATE_OVERRIDE ? new Date(window.TEST_DATE_OVERRIDE) : new Date();

            // Calculate days since journey start
            const daysSinceStart = Math.floor((today - journeyStart) / (1000 * 60 * 60 * 24));

            // Base destinations to show (start with 3, add 1 per day)
            let destinationsToShow;

            if (daysSinceStart < 0) {
                // Before journey start - show first 3 destinations
                destinationsToShow = 3;
                console.log(`📅 Before journey start (${Math.abs(daysSinceStart)} days early) - showing first 3 destinations`);
            } else if (daysSinceStart === 0) {
                // Journey start day (Sept 29) - show 3 destinations
                destinationsToShow = 3;
                console.log(`🚀 Journey start day! Showing 3 destinations`);
            } else {
                // After journey start - add 1 destination per day
                destinationsToShow = Math.min(3 + daysSinceStart, 50);
                console.log(`📈 Day ${daysSinceStart} of journey - showing ${destinationsToShow} destinations`);
            }

            if (!ENABLE_LIMITED_VIEW) {
                console.log('🌍 Limited view disabled - showing all 50 destinations');
                return journeyLocations;
            }

            console.log(`🎯 PROGRESSIVE REVEAL ACTIVE:`);
            console.log(`   Journey start: ${journeyStart.toDateString()}`);
            console.log(`   Today: ${today.toDateString()}${window.TEST_DATE_OVERRIDE ? ' (SIMULATED FOR TESTING)' : ''}`);
            console.log(`   Time difference (ms): ${today - journeyStart}`);
            console.log(`   Days since start: ${daysSinceStart}`);
            console.log(`   Calculation: 3 + ${daysSinceStart} = ${3 + daysSinceStart}`);
            console.log(`   Destinations to show: ${destinationsToShow}/50`);
            console.log(`   ⚠️  DAYS_TO_SHOW config: ${DAYS_TO_SHOW} (should NOT affect progressive reveal)`);

            let filtered = journeyLocations.slice(0, destinationsToShow);
            console.log(`📍 After slice(0, ${destinationsToShow}): ${filtered.length} destinations`);

            // Apply "Coming Soon" mystery as an ADDITIONAL card (unless showing all 50)
            if (ENABLE_COMING_SOON && destinationsToShow < 50 && filtered.length >= 1) {
                // Get the next destination after our current visible ones
                const nextDestinationIndex = destinationsToShow; // 0-based index of next destination
                const nextActualDestination = journeyLocations[nextDestinationIndex];

                if (nextActualDestination) {
                    const comingSoonDestination = createComingSoonDestination(nextActualDestination);

                    // ADD mystery as an extra card (don't replace existing ones)
                    filtered.push(comingSoonDestination);

                    console.log(`🔮 COMING SOON ACTIVE: Added mystery destination as card #${filtered.length}`);
                    console.log(`   Next actual destination: ${nextActualDestination.state} - ${nextActualDestination.name}`);
                    console.log(`   Mystery preview: ${comingSoonDestination.description}`);
                    console.log(`   Current visible: ${destinationsToShow} real + 1 mystery = ${filtered.length} total cards`);
                }
            }

            console.log(`📍 Progressive reveal showing ${filtered.length} total cards:`);
            filtered.forEach((location, index) => {
                if (location.isComingSoon) {
                    console.log(`   ${index + 1}. 🔮 ${location.state} - ${location.name} (${location.description})`);
                } else {
                    console.log(`   ${index + 1}. ${location.state} - ${location.name} (${location.visitDate})`);
                }
            });

            console.log(`🔥 FINAL RESULT: Returning ${filtered.length} total destinations (${filtered.filter(l => !l.isComingSoon).length} real + ${filtered.filter(l => l.isComingSoon).length} mystery)`);
            return filtered;
        }

        // Get current working dataset
        const workingLocations = getFilteredLocations();
        console.log('🎯 Working with', workingLocations.length, 'destinations');

        // Display configuration info
        if (ENABLE_LIMITED_VIEW) {
            console.log(`📅 LIMITED VIEW ENABLED:`);
            console.log(`   • Fixed journey start: ${getJourneyStartDate().toDateString()}`);
            console.log(`   • Showing: Journey start + next ${DAYS_TO_SHOW} days`);
            console.log(`   • Total markers: ${workingLocations.length}`);
            console.log(`   • Starting at marker #1 (journey starting point)`);
            console.log(`   • This gives consistent first 3-4 destinations regardless of current date`);
        } else {
            console.log('🌍 FULL VIEW - All 50 destinations visible');
        }

        // Track current journey day within filtered data
        let filteredCurrentDay = 1; // Start at first filtered location

        const getAdjustedCurrentDay = () => {
            if (!ENABLE_LIMITED_VIEW) {
                return currentJourneyDay;
            }
            // Return current position within filtered dataset (1-4)
            return filteredCurrentDay;
        };

        // Initialize Mapbox map
        let map;

        function initializeMap() {
            if (typeof mapboxgl === 'undefined') {
                console.error('Mapbox GL JS not loaded');
                return;
            }

            mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZXJza290dGUiLCJhIjoiY21mdDc0eTBkMGNyejJqb2h0eXVhdHczZCJ9.aBg4DtEAbvrmaoAfh-EXhg';

            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/light-v11',
                center: [-98.5, 39.5],
                zoom: 3.5
            });

            map.addControl(new mapboxgl.NavigationControl());

            // Wait for map to be fully loaded and idle before adding markers
            map.on('load', function() {
                console.log('Map loaded, adding journey markers...');


                // Add a small delay to ensure map is fully rendered
                setTimeout(() => {
                    addJourneyMarkers();

                    // Show initial straight-line routes immediately
                    console.log(`Current journey day: ${currentJourneyDay}`);
                    addSimpleRoute(); // Add this as immediate fallback

                    // Load real road routes (this will take a few seconds)
                    loadAllRoutes();

                    // Verify markers are in correct positions
                    console.log('Sample marker positions:');
                    console.log('Maine:', journeyLocations[0].coordinates);
                    console.log('California:', journeyLocations[47].coordinates);
                    console.log('Texas:', journeyLocations[33].coordinates);

                    setTimeout(() => {
                        centerOnCurrentLocation();
                    }, 500);
                }, 100);
            });

            // Add error handling
            map.on('error', function(e) {
                console.error('Map error:', e.error);
            });
        }

        // Test function to add simple markers for debugging
        function addTestMarkers() {
            // Add a few test markers at known locations to verify positioning
            const testLocations = [
                { name: 'Los Angeles', coords: [-118.2437, 34.0522] },
                { name: 'New York', coords: [-74.0060, 40.7128] },
                { name: 'Chicago', coords: [-87.6298, 41.8781] },
                { name: 'Miami', coords: [-80.1918, 25.7617] },
                { name: 'Seattle', coords: [-122.3321, 47.6062] }
            ];

            testLocations.forEach(loc => {
                new mapboxgl.Marker({ color: '#FF0000' })
                    .setLngLat(loc.coords)
                    .addTo(map);
                console.log(`Test marker added at ${loc.name}:`, loc.coords);
            });
        }

        // Track currently open popup for mobile single-popup behavior
        let currentMobilePopup = null;

        // Track all marker instances for proper cleanup
        let markerInstances = [];

        function addJourneyMarkers() {
            workingLocations.forEach((location, index) => {
                let markerStatus = '';
                let markerColor = '#666666';

                const adjustedCurrentDay = getAdjustedCurrentDay();
                const markerIndex = index + 1; // 1-based index for filtered locations

                if (markerIndex < adjustedCurrentDay) {
                    markerStatus = 'completed';
                    markerColor = '#8E24AA';
                } else if (markerIndex === adjustedCurrentDay) {
                    markerStatus = 'current';
                    markerColor = '#FFD700';
                } else {
                    markerStatus = 'future';
                    markerColor = '#666666';
                }

                // Toggle between default and custom markers for testing
                const useDefaultMarker = false; // Set to false to use custom numbered markers

                if (useDefaultMarker) {
                    // Use default Mapbox markers to verify coordinates
                    const marker = new mapboxgl.Marker({
                        color: markerColor,
                        scale: 0.7
                    })
                        .setLngLat(location.coordinates)
                        .addTo(map);

                    // Track marker instance for proper cleanup
                    markerInstances.push(marker);

                    // Add popup to default marker
                    const popupContent = `
                        <div class="journey-popup">
                            <h3 style="text-align: center;">${location.state} - ${location.name}</h3>
                            <p class="visit-date" style="color: var(--sunset-orange); font-weight: 600; margin-bottom: 10px; font-size: 1.1rem; text-align: center;">📅 ${location.visitDate}</p>
                            <p class="description">${location.description}</p>
                        </div>
                    `;

                    // Detect if device supports touch
                    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

                    const popup = new mapboxgl.Popup({
                        offset: 25,
                        closeButton: false,
                        closeOnClick: isTouchDevice // Allow close on click for mobile, prevent for desktop hover
                    }).setHTML(popupContent);

                    marker.setPopup(popup);

                    const markerElement = marker.getElement();

                    if (isTouchDevice) {
                        // Mobile/Touch device - use touch events
                        markerElement.addEventListener('touchstart', (e) => {
                            e.preventDefault(); // Prevent default touch behavior

                            // Close any existing popup before opening new one
                            if (currentMobilePopup && currentMobilePopup !== popup) {
                                currentMobilePopup.remove();
                            }

                            popup.addTo(map);
                            currentMobilePopup = popup;
                        });

                        // Also support click as fallback
                        markerElement.addEventListener('click', (e) => {
                            e.stopPropagation();

                            // Close any existing popup before opening new one
                            if (currentMobilePopup && currentMobilePopup !== popup) {
                                currentMobilePopup.remove();
                            }

                            popup.addTo(map);
                            currentMobilePopup = popup;
                        });
                    } else {
                        // Desktop - use hover + click
                        markerElement.addEventListener('mouseenter', () => {
                            popup.addTo(map);
                        });

                        markerElement.addEventListener('mouseleave', () => {
                            popup.remove();
                        });

                        markerElement.addEventListener('click', () => {
                            popup.addTo(map);
                        });
                    }

                } else {
                    // Custom marker implementation
                    const markerEl = document.createElement('div');
                    markerEl.className = `journey-marker ${markerStatus}`;

                    // Special styling for Coming Soon destinations
                    if (location.isComingSoon) {
                        markerEl.style.cssText = `
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background: linear-gradient(45deg, #8A2BE2, #9932CC, #BA55D3, #DA70D6);
                            background-size: 400% 400%;
                            animation: mysteryGlow 3s ease-in-out infinite;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            font-size: 16px;
                            font-weight: 700;
                            margin: 0;
                            padding: 0;
                            border: 3px solid rgba(255, 255, 255, 0.9);
                            box-shadow: 0 0 20px rgba(138, 43, 226, 0.6), 0 4px 12px rgba(0, 0, 0, 0.3);
                            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
                            position: relative;
                            overflow: hidden;
                        `;
                        markerEl.textContent = '?';

                        // Add pulsing glow effect
                        markerEl.innerHTML = `
                            <div style="
                                position: absolute;
                                top: -3px;
                                left: -3px;
                                right: -3px;
                                bottom: -3px;
                                border-radius: 50%;
                                background: linear-gradient(45deg, #8A2BE2, #9932CC, #BA55D3, #DA70D6);
                                opacity: 0.3;
                                animation: mysteryPulse 2s ease-in-out infinite;
                                z-index: -1;
                            "></div>
                            <span style="position: relative; z-index: 1;">?</span>
                        `;
                    } else {
                        // Set explicit dimensions with NO transforms to preserve coordinate accuracy
                        markerEl.style.cssText = `
                            width: 32px;
                            height: 32px;
                            border-radius: 50%;
                            background: ${markerStatus === 'completed' ? 'linear-gradient(135deg, #FF6B35, #FFAB91)' :
                                         markerStatus === 'current' ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                                         'rgba(255, 255, 255, 0.1)'};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: ${markerStatus === 'future' ? '#fff' : '#000'};
                            font-size: 14px;
                            font-weight: 700;
                            margin: 0;
                            padding: 0;
                            border: 2px solid rgba(255, 255, 255, 0.8);
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                            text-shadow: ${markerStatus === 'future' ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.5)'};
                        `;
                        markerEl.textContent = markerIndex.toString();
                    }

                    // Create marker with anchor: 'center' to ensure precise positioning
                    const marker = new mapboxgl.Marker({
                        element: markerEl,
                        anchor: 'center'
                    })
                        .setLngLat(location.coordinates)
                        .addTo(map);

                    // Track marker instance for proper cleanup
                    markerInstances.push(marker);

                    // Add popup with special styling for Coming Soon destinations
                    let popupContent;
                    if (location.isComingSoon) {
                        popupContent = `
                            <div class="journey-popup mystery-popup" style="
                                background: linear-gradient(135deg, #8A2BE2, #9932CC, #BA55D3);
                                color: white;
                                border-radius: 15px;
                                position: relative;
                                overflow: hidden;
                            ">
                                <div style="
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
                                    animation: mysteryShimmer 3s ease-in-out infinite;
                                    pointer-events: none;
                                "></div>
                                <div style="position: relative; z-index: 2;">
                                    <h3 style="text-align: center !important; color: #FFFFFF !important; font-weight: 900 !important; font-size: 1.3rem !important; text-shadow: 0 2px 8px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7) !important; letter-spacing: 0.5px !important; background: none !important; -webkit-background-clip: unset !important; -webkit-text-fill-color: #FFFFFF !important; background-clip: unset !important;">
                                        🔮 ${location.state} - ${location.name}
                                    </h3>
                                    <p class="visit-date" style="color: #FFFFFF !important; font-weight: 800 !important; margin-bottom: 10px !important; font-size: 1.1rem !important; text-align: center !important; text-shadow: 0 2px 6px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7) !important; letter-spacing: 0.3px !important;">
                                        ✨ ${location.visitDate}
                                    </p>
                                    <p class="address" style="color: #FFFFFF !important; text-align: center !important; font-style: italic !important; font-weight: 500 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.6) !important; opacity: 1 !important;">
                                        ${location.address}
                                    </p>
                                    <p class="description" style="color: #FFFFFF !important; text-align: center !important; font-size: 1.1rem !important; margin: 15px 0 !important; font-weight: 600 !important; text-shadow: 0 2px 6px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.7) !important; line-height: 1.4 !important; opacity: 1 !important;">
                                        ${location.description}
                                    </p>
                                    <div class="journey-stats" style="
                                        display: flex;
                                        gap: 15px;
                                        justify-content: center;
                                        margin: 15px 0;
                                        padding: 10px;
                                        background: rgba(255, 255, 255, 0.1);
                                        border-radius: 10px;
                                        backdrop-filter: blur(10px);
                                    ">
                                        <span style="color: #FFFFFF !important; font-weight: 700 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.7) !important; letter-spacing: 0.2px !important;">🌟 Coming Soon</span>
                                        <span style="color: #FFFFFF !important; font-weight: 700 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.7) !important; letter-spacing: 0.2px !important;">🔮 Mystery</span>
                                        <span style="color: #FFFFFF !important; font-weight: 700 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.7) !important; letter-spacing: 0.2px !important;">✨ Surprise</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        popupContent = `
                            <div class="journey-popup">
                                <h3 style="text-align: center;">${location.state} - ${location.name}</h3>
                                <p class="visit-date" style="color: var(--sunset-orange); font-weight: 600; margin-bottom: 10px; font-size: 1.1rem; text-align: center;">📅 ${location.visitDate}</p>
                                <p class="address">${location.address}</p>
                                <p class="description">${location.description}</p>
                                <div class="journey-stats">
                                    <span class="drive-time">🚗 ${location.driveTime}</span>
                                    ${location.hikeTime ? `<span class="hike-time">🥾 ${location.hikeTime}</span>` : ''}
                                    ${location.flightTime ? `<span class="flight-time">✈️ ${location.flightTime}</span>` : ''}
                                </div>
                            </div>
                        `;
                    }

                    // Detect if device supports touch
                    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

                    const popup = new mapboxgl.Popup({
                        offset: 12,
                        closeButton: false,
                        closeOnClick: isTouchDevice // Allow close on click for mobile, prevent for desktop hover
                    }).setHTML(popupContent);

                    marker.setPopup(popup);

                    if (isTouchDevice) {
                        // Mobile/Touch device - use touch events for custom markers
                        markerEl.addEventListener('touchstart', (e) => {
                            e.preventDefault(); // Prevent default touch behavior

                            // Close any existing popup before opening new one
                            if (currentMobilePopup && currentMobilePopup !== popup) {
                                currentMobilePopup.remove();
                            }

                            popup.addTo(map);
                            currentMobilePopup = popup;
                        });

                        // Also support click as fallback for custom markers
                        markerEl.addEventListener('click', (e) => {
                            e.stopPropagation();

                            // Close any existing popup before opening new one
                            if (currentMobilePopup && currentMobilePopup !== popup) {
                                currentMobilePopup.remove();
                            }

                            popup.addTo(map);
                            currentMobilePopup = popup;
                        });
                    } else {
                        // Desktop - use hover + click for custom markers
                        markerEl.addEventListener('mouseenter', () => {
                            popup.addTo(map);
                        });

                        markerEl.addEventListener('mouseleave', () => {
                            popup.remove();
                        });

                        markerEl.addEventListener('click', () => {
                            popup.addTo(map);
                        });
                    }
                }
            });

            console.log(`Added ${workingLocations.length} markers to the map`);

            // Log a few specific locations to verify
            console.log('Verifying filtered locations:');
            if (workingLocations.length > 0) {
                console.log('First location:', workingLocations[0].state, workingLocations[0].coordinates);
            }
            if (workingLocations.length > 1) {
                console.log('Second location:', workingLocations[1].state, workingLocations[1].coordinates);
            }
            if (workingLocations.length > 2) {
                console.log('Third location:', workingLocations[2].state, workingLocations[2].coordinates);
            }
        }

        // Store route geometries for better performance
        let routeCache = {};
        let routesLoaded = 0;
        const totalRoutes = workingLocations.length - 1;

        // Simple straight-line route as immediate fallback
        function addSimpleRoute() {
            console.log('Adding simple straight-line routes as fallback...');

            // Remove existing route layers
            ['completed-route-line', 'current-route-line', 'future-route-line'].forEach(layerId => {
                if (map.getLayer(layerId)) map.removeLayer(layerId);
            });
            ['completed-route', 'current-route', 'future-route'].forEach(sourceId => {
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            });

            // Always show the full journey route for filtered locations
            const allCoordinates = workingLocations.map(location => location.coordinates);

            map.addSource('future-route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: allCoordinates
                    }
                }
            });

            map.addLayer({
                id: 'future-route-line',
                type: 'line',
                source: 'future-route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#666666',
                    'line-width': 3,
                    'line-opacity': 0.7
                }
            });

            console.log('Simple route added with', allCoordinates.length, 'coordinate points');
        }

        async function getRouteGeometry(startCoords, endCoords, routeId) {
            // Check cache first
            if (routeCache[routeId]) {
                return routeCache[routeId];
            }

            try {
                const query = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                    { method: 'GET' }
                );
                const json = await query.json();

                if (json.routes && json.routes[0]) {
                    const geometry = json.routes[0].geometry;
                    routeCache[routeId] = geometry;
                    return geometry;
                }
            } catch (error) {
                console.log(`Route API failed for ${routeId}, using straight line`);
            }

            // Fallback to straight line if API fails
            return {
                type: 'LineString',
                coordinates: [startCoords, endCoords]
            };
        }

        async function loadAllRoutes() {
            console.log('Loading road routes for filtered destinations...');

            for (let i = 0; i < workingLocations.length - 1; i++) {
                const start = workingLocations[i];
                const end = workingLocations[i + 1];
                const routeId = `${start.id}-${end.id}`;

                const geometry = await getRouteGeometry(start.coordinates, end.coordinates, routeId);
                routesLoaded++;

                console.log(`Route ${routeId}: ${geometry ? 'SUCCESS' : 'FAILED'} - ${routesLoaded}/${totalRoutes}`);

                // Update map with road routes every 10 successful loads
                if (routesLoaded % 10 === 0) {
                    console.log(`Loaded ${routesLoaded}/${totalRoutes} routes, updating map with road routes...`);
                    addJourneyRoute();
                }

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 150));
            }

            console.log('All road routes loaded! Final map update with complete road network...');
            addJourneyRoute();
        }

        function addJourneyRoute() {
            console.log('Drawing filtered journey routes...');

            // Remove existing route layers
            ['completed-route-line', 'current-route-line', 'future-route-line'].forEach(layerId => {
                if (map.getLayer(layerId)) map.removeLayer(layerId);
            });
            ['completed-route', 'current-route', 'future-route'].forEach(sourceId => {
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            });

            if (workingLocations.length < 2) {
                console.log('Not enough locations for route drawing');
                return;
            }

            // Helper function to get route coordinates for filtered locations
            function getRouteCoordinates(startLocation, endLocation) {
                const routeId = `${startLocation.id}-${endLocation.id}`;

                // Check if we have cached route data
                if (routeCache[routeId] && routeCache[routeId].coordinates) {
                    return routeCache[routeId].coordinates;
                }
                // Fallback to straight line
                return [startLocation.coordinates, endLocation.coordinates];
            }

            const adjustedCurrentDay = getAdjustedCurrentDay();
            console.log(`Current filtered day: ${adjustedCurrentDay}/${workingLocations.length}`);

            // Add completed routes (in filtered dataset)
            if (adjustedCurrentDay > 1) {
                let allCompletedCoordinates = [];

                for (let i = 0; i < adjustedCurrentDay - 1; i++) {
                    if (i + 1 < workingLocations.length) {
                        const start = workingLocations[i];
                        const end = workingLocations[i + 1];
                        const routeCoords = getRouteCoordinates(start, end);

                        // Add all coordinates from this route segment
                        allCompletedCoordinates = allCompletedCoordinates.concat(routeCoords);
                    }
                }

                if (allCompletedCoordinates.length > 0) {
                    console.log(`Adding completed route with ${allCompletedCoordinates.length} coordinates`);

                    map.addSource('completed-route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: allCompletedCoordinates
                            }
                        }
                    });

                    map.addLayer({
                        id: 'completed-route-line',
                        type: 'line',
                        source: 'completed-route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#FF6B35',
                            'line-width': 4,
                            'line-opacity': 0.8
                        }
                    });
                }
            }

            // Add current route segment (if not at first location and has next location)
            if (adjustedCurrentDay > 1 && adjustedCurrentDay <= workingLocations.length) {
                const prevIndex = adjustedCurrentDay - 2;
                const currentIndex = adjustedCurrentDay - 1;

                if (prevIndex >= 0 && currentIndex < workingLocations.length) {
                    const prevLocation = workingLocations[prevIndex];
                    const currentLocation = workingLocations[currentIndex];
                    const currentRouteCoords = getRouteCoordinates(prevLocation, currentLocation);

                    console.log(`Adding current route with ${currentRouteCoords.length} coordinates`);

                    map.addSource('current-route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: currentRouteCoords
                            }
                        }
                    });

                    map.addLayer({
                        id: 'current-route-line',
                        type: 'line',
                        source: 'current-route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#FFD700',
                            'line-width': 5,
                            'line-opacity': 0.9
                        }
                    });
                }
            }

            // Add future routes (in filtered dataset)
            if (adjustedCurrentDay < workingLocations.length) {
                let allFutureCoordinates = [];

                for (let i = adjustedCurrentDay - 1; i < workingLocations.length - 1; i++) {
                    const start = workingLocations[i];
                    const end = workingLocations[i + 1];
                    const routeCoords = getRouteCoordinates(start, end);

                    // Add all coordinates from this route segment
                    allFutureCoordinates = allFutureCoordinates.concat(routeCoords);
                }

                if (allFutureCoordinates.length > 0) {
                    console.log(`Adding future route with ${allFutureCoordinates.length} coordinates`);

                    map.addSource('future-route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: allFutureCoordinates
                            }
                        }
                    });

                    map.addLayer({
                        id: 'future-route-line',
                        type: 'line',
                        source: 'future-route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#666666',
                            'line-width': 2,
                            'line-opacity': 0.5
                        }
                    });
                }
            }

            console.log('Filtered journey routes drawing completed');
        }

        function fitMapToJourney() {
            if (!map) return;
            const coordinates = workingLocations.map(location => location.coordinates);
            const bounds = coordinates.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

            map.fitBounds(bounds, {
                padding: 50
            });
        }

        function centerOnCurrentLocation() {
            const adjustedCurrentDay = getAdjustedCurrentDay();
            if (!map || adjustedCurrentDay < 1 || adjustedCurrentDay > workingLocations.length) return;
            const currentLocation = workingLocations[adjustedCurrentDay - 1];
            map.flyTo({
                center: currentLocation.coordinates,
                zoom: 6,
                duration: 2000
            });
        }

        function updateJourneyProgress(newCurrentDay) {
            if (newCurrentDay < 1 || newCurrentDay > workingLocations.length) {
                return;
            }

            if (ENABLE_LIMITED_VIEW) {
                filteredCurrentDay = newCurrentDay;
                console.log(`Updated filtered current day to: ${filteredCurrentDay}/${workingLocations.length}`);
            } else {
                currentJourneyDay = newCurrentDay;
            }

            // Clear any mobile popup reference when navigating
            if (currentMobilePopup) {
                currentMobilePopup.remove();
                currentMobilePopup = null;
            }

            // Properly dispose of all Mapbox Marker instances
            markerInstances.forEach(marker => {
                if (marker && typeof marker.remove === 'function') {
                    marker.remove();
                }
            });
            markerInstances = []; // Clear the array

            // Clean up any remaining DOM elements as fallback
            const markers = document.querySelectorAll('.journey-marker');
            markers.forEach(marker => marker.remove());

            if (map.getLayer('completed-route-line')) map.removeLayer('completed-route-line');
            if (map.getLayer('current-route-line')) map.removeLayer('current-route-line');
            if (map.getLayer('future-route-line')) map.removeLayer('future-route-line');
            if (map.getSource('completed-route')) map.removeSource('completed-route');
            if (map.getSource('current-route')) map.removeSource('current-route');
            if (map.getSource('future-route')) map.removeSource('future-route');

            addJourneyMarkers();
            addJourneyRoute(); // This will now use cached road routes
            centerOnCurrentLocation();
        }

        function nextDay() {
            const currentDay = getAdjustedCurrentDay();
            const newDay = currentDay < workingLocations.length ? currentDay + 1 : 1;
            console.log(`Moving to next day: ${newDay} (from ${currentDay})`);
            updateJourneyProgress(newDay);
        }

        function previousDay() {
            const currentDay = getAdjustedCurrentDay();
            const newDay = currentDay > 1 ? currentDay - 1 : workingLocations.length;
            console.log(`Moving to previous day: ${newDay} (from ${currentDay})`);
            updateJourneyProgress(newDay);
        }

        window.MegaAmericaMap = {
            init: initializeMap,
            fitToJourney: fitMapToJourney,
            centerOnCurrent: centerOnCurrentLocation,
            updateProgress: updateJourneyProgress,
            nextDay: nextDay,
            previousDay: previousDay,
            locations: workingLocations,
            getCurrentDay: () => getAdjustedCurrentDay()
        };

        // Destinations Scroller Functionality
        let currentDestinationIndex = 0;
        const destinationsPerView = 3;

        // Reset carousel position when page loads
        function resetScrollPosition() {
            if (carousel && carousel.track) {
                carousel.reset();
                console.log('✅ Simple carousel reset to beginning');
            }
        }

        // Optimized card generation with lazy loading for mobile performance
        function generateDestinationCards() {
            const track = document.getElementById('destinations-track');
            const gradients = [
                'linear-gradient(135deg, #1a1a2e, #16213e)',
                'linear-gradient(135deg, #0f3443, #34e89e)',
                'linear-gradient(135deg, #373b44, #4286f4)',
                'linear-gradient(135deg, #243949, #517fa4)',
                'linear-gradient(135deg, #553d67, #f64f59)',
                'linear-gradient(135deg, #4b134f, #c94b4b)',
                'linear-gradient(135deg, #2c3e50, #3498db)',
                'linear-gradient(135deg, #8e2de2, #4a00e0)',
                'linear-gradient(135deg, #ff6b6b, #feca57)',
                'linear-gradient(135deg, #48cae4, #023e8a)'
            ];

            const isMobile = window.innerWidth <= 768;
            const initialLoad = isMobile ? Math.min(25, workingLocations.length) : Math.min(20, workingLocations.length); // Load most/all cards initially on mobile for instant response

            // Create initial batch of cards for immediate display
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < Math.min(initialLoad, workingLocations.length); i++) {
                const card = createOptimizedCard(workingLocations[i], gradients[i % gradients.length], i);
                fragment.appendChild(card);
            }

            track.appendChild(fragment);

            // Load remaining cards immediately on mobile for instant numbers
            if (isMobile && workingLocations.length > initialLoad) {
                // Load remaining cards immediately for instant response
                loadRemainingCards(track, workingLocations, gradients, initialLoad);
            } else if (!isMobile && workingLocations.length > initialLoad) {
                // Load remaining cards immediately on desktop
                loadRemainingCards(track, workingLocations, gradients, initialLoad);
            }
        }

        // Optimized card creation using DOM methods instead of innerHTML
        function createOptimizedCard(location, gradient, index) {
            // Create main card container
            const card = document.createElement('div');

            // Special styling for Coming Soon destinations
            if (location.isComingSoon) {
                card.className = 'destination-card mystery-card';
                card.style.cssText = `
                    background: linear-gradient(135deg, #8A2BE2, #9932CC, #BA55D3, #DA70D6);
                    background-size: 400% 400%;
                    animation: mysteryGlow 4s ease-in-out infinite;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 0 30px rgba(138, 43, 226, 0.4), 0 8px 32px rgba(0, 0, 0, 0.2);
                    position: relative;
                    overflow: hidden;
                `;

                // Add shimmering overlay
                const shimmer = document.createElement('div');
                shimmer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: mysteryShimmer 3s ease-in-out infinite;
                    pointer-events: none;
                `;
                card.appendChild(shimmer);
            } else {
                card.className = 'destination-card';
            }

            // Create background (only for non-mystery cards)
            if (!location.isComingSoon) {
                const bg = document.createElement('div');
                bg.className = 'destination-bg';
                bg.style.background = gradient;
                card.appendChild(bg);
            }

            // Create number with special styling for mystery cards
            const number = document.createElement('div');
            number.className = 'destination-number';
            if (location.isComingSoon) {
                number.textContent = '?';
                number.style.cssText = `
                    color: #FFD700;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7), 0 0 10px rgba(255, 215, 0, 0.5);
                    font-size: 1.8rem;
                    font-weight: 900;
                `;
            } else {
                number.textContent = (index + 1).toString().padStart(2, '0');
            }
            card.appendChild(number);

            // Create content container
            const content = document.createElement('div');
            content.className = 'destination-content';
            if (location.isComingSoon) {
                content.style.cssText = `
                    color: white;
                    position: relative;
                    z-index: 10;
                `;
            }

            // Create name
            const name = document.createElement('h3');
            name.className = 'destination-name';
            name.textContent = location.name;
            if (location.isComingSoon) {
                name.style.cssText = `
                    color: #FFFFFF;
                    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 4px rgba(0, 0, 0, 0.7);
                    font-weight: 900;
                    font-size: 1.3rem;
                    letter-spacing: 0.5px;
                `;
                name.textContent = '🔮 ' + location.name;
            }
            content.appendChild(name);

            // Create state
            const state = document.createElement('p');
            state.className = 'destination-state';
            state.textContent = location.state;
            if (location.isComingSoon) {
                state.style.cssText = `
                    color: #FFFFFF;
                    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7);
                    font-weight: 700;
                    font-size: 1.1rem;
                    letter-spacing: 0.3px;
                `;
                state.textContent = '✨ ' + location.state;
            }
            content.appendChild(state);

            // Create description
            const description = document.createElement('p');
            description.className = 'destination-description';
            description.textContent = location.description;
            if (location.isComingSoon) {
                description.style.cssText = `
                    color: #FFFFFF;
                    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7);
                    font-style: italic;
                    font-size: 1.1rem;
                    font-weight: 500;
                    line-height: 1.4;
                `;
            }
            content.appendChild(description);

            // Create visit date
            const visitDate = document.createElement('div');
            visitDate.className = 'visit-date';
            if (location.isComingSoon) {
                visitDate.textContent = `✨ ${location.visitDate}`;
                visitDate.style.cssText = `
                    color: #FFFFFF;
                    text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.7);
                    font-weight: 800;
                    font-size: 1.05rem;
                    letter-spacing: 0.2px;
                `;
            } else {
                visitDate.textContent = `📅 ${location.visitDate}`;
            }
            content.appendChild(visitDate);

            // Create details container
            const details = document.createElement('div');
            details.className = 'destination-details';

            if (location.isComingSoon) {
                // Special mystery details for Coming Soon cards
                const mysteryDetails = [
                    { icon: '🌟', text: 'Coming Soon' },
                    { icon: '🔮', text: 'Mystery' },
                    { icon: '✨', text: 'Surprise' }
                ];

                mysteryDetails.forEach(detail => {
                    const span = document.createElement('span');
                    span.className = 'travel-time mystery-detail';
                    span.textContent = `${detail.icon} ${detail.text}`;
                    span.style.cssText = `
                        color: #FFFFFF;
                        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 1px 2px rgba(0, 0, 0, 0.7);
                        font-weight: 600;
                        font-size: 0.95rem;
                        letter-spacing: 0.2px;
                    `;
                    details.appendChild(span);
                });
            } else {
                // Add travel times if they exist (for normal cards)
                const travelTypes = [
                    { time: location.driveTime, icon: '🚗' },
                    { time: location.hikeTime, icon: '🥾' },
                    { time: location.flightTime, icon: '✈️' }
                ];

                travelTypes.forEach(travel => {
                    if (travel.time) {
                        const span = document.createElement('span');
                        span.className = 'travel-time';
                        span.textContent = `${travel.icon} ${travel.time}`;
                        details.appendChild(span);
                    }
                });
            }

            content.appendChild(details);
            card.appendChild(content);

            return card;
        }

        // Load remaining cards in optimized batches to prevent blocking
        function loadRemainingCards(track, locations, gradients, startIndex) {
            const isMobile = window.innerWidth <= 768;
            const batchSize = isMobile ? 8 : 10; // Larger batches on mobile for faster loading
            let currentIndex = startIndex;

            function loadBatch() {
                const fragment = document.createDocumentFragment();
                const endIndex = Math.min(currentIndex + batchSize, locations.length);

                for (let i = currentIndex; i < endIndex; i++) {
                    const card = createOptimizedCard(locations[i], gradients[i % gradients.length], i);
                    fragment.appendChild(card);
                }

                track.appendChild(fragment);
                currentIndex = endIndex;

                // Continue loading if there are more cards
                if (currentIndex < locations.length) {
                    // Load next batch immediately on mobile for faster number loading
                    if (isMobile) {
                        setTimeout(loadBatch, 50); // Very short delay on mobile
                    } else {
                        requestAnimationFrame(loadBatch); // Standard approach on desktop
                    }
                }
            }

            // Start first batch
            if (isMobile) {
                loadBatch(); // Load immediately on mobile
            } else {
                requestAnimationFrame(loadBatch);
            }
        }

        // Optimized Carousel Implementation with simplified physics for mobile
        class SimpleCarousel {
            constructor() {
                this.container = null;
                this.track = null;
                this.currentIndex = 0;
                this.isTransitioning = false;
                this.isMobile = window.innerWidth <= 768;

                // Optimized touch state for mobile and desktop
                this.touch = {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    startTime: 0,
                    diff: 0,
                    isDragging: false,
                    isHorizontalSwipe: null,
                    samples: [] // For velocity tracking (simplified on mobile)
                };

                // Momentum physics for both mobile and desktop (optimized for mobile)
                this.momentum = {
                    velocity: 0,
                    position: 0,
                    isActive: false,
                    friction: this.isMobile ? 0.96 : 0.95, // Higher friction value = LESS friction = MORE momentum
                    threshold: this.isMobile ? 0.2 : 0.5, // Lower threshold on mobile for longer momentum
                    velocityMultiplier: this.isMobile ? 3.5 : 1.0, // Amplify mobile velocity for better throw distance
                    animationId: null
                };

                this.init();
            }

            init() {
                this.container = document.querySelector('.destinations-scroller');
                this.track = document.getElementById('destinations-track');

                if (!this.track) return;

                // Performance optimizations based on device
                if (this.isMobile) {
                    // Mobile: Gentle transitions for smooth snapping
                    this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    this.track.style.willChange = 'auto';
                } else {
                    // Desktop: Smooth transitions with will-change
                    this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                    this.track.style.willChange = 'transform';
                }

                this.updatePosition();
                this.bindEvents();
            }

            // Get current carousel dimensions
            getDimensions() {
                const width = window.innerWidth;
                const isMobile = width <= 768;
                const isTablet = width > 768 && width <= 1024;

                const cardWidth = isMobile ? 280 : 400;
                const gap = isMobile ? 16 : 32;

                // Dynamic cards to show based on device and total cards
                let cardsToShow;
                if (isMobile) {
                    cardsToShow = 1; // Mobile always shows 1
                } else if (isTablet && workingLocations.length >= 4) {
                    cardsToShow = 2; // iPad shows 2 when we have 4+ cards (including mystery)
                } else {
                    cardsToShow = Math.min(3, workingLocations.length); // Desktop shows up to 3, but not more than available
                }

                return {
                    cardWidth,
                    gap,
                    slideWidth: cardWidth + gap,
                    cardsToShow,
                    totalCards: workingLocations.length
                };
            }

            // Update carousel position (optimized transitions for mobile)
            updatePosition(smooth = true) {
                if (!this.track) return;

                const { slideWidth } = this.getDimensions();
                const translateX = -this.currentIndex * slideWidth;

                // Smooth, gentle transitions for both platforms
                if (smooth) {
                    const transition = this.isMobile
                        ? 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)' // Gentle ease for mobile
                        : 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';   // Smooth ease for desktop
                    this.track.style.transition = transition;
                } else {
                    this.track.style.transition = 'none';
                }

                this.track.style.transform = `translate3d(${translateX}px, 0, 0)`;

                // Update global state
                currentDestinationIndex = this.currentIndex;
            }

            // Move to specific slide
            goTo(index, smooth = true) {
                if (this.isTransitioning) return;

                const { cardsToShow, totalCards } = this.getDimensions();
                const maxIndex = Math.max(0, totalCards - cardsToShow);

                this.currentIndex = Math.max(0, Math.min(index, maxIndex));
                this.updatePosition(smooth);

                if (smooth) {
                    this.isTransitioning = true;
                    setTimeout(() => {
                        this.isTransitioning = false;
                    }, 400);
                }
            }

            // Move by direction
            move(direction) {
                const newIndex = this.currentIndex + direction;
                this.goTo(newIndex, true);
            }

            // Smart touch handling - only prevent scroll for horizontal swipes
            onTouchStart = (e) => {
                if (this.isTransitioning) return;

                const touch = e.touches ? e.touches[0] : e;
                const now = Date.now();

                // Stop any active momentum animation
                if (this.momentum.isActive) {
                    this.stopMomentum();
                }

                // Initialize touch tracking for momentum physics
                this.touch.startX = touch.clientX;
                this.touch.startY = touch.clientY; // Track Y for swipe direction detection
                this.touch.currentX = touch.clientX;
                this.touch.currentY = touch.clientY;
                this.touch.startTime = now;
                this.touch.isDragging = true;
                this.touch.isHorizontalSwipe = null; // Determine based on movement
                this.touch.samples = [{ x: touch.clientX, time: now }];

                // Get current momentum position
                const { slideWidth } = this.getDimensions();
                this.momentum.position = -this.currentIndex * slideWidth;

                // Disable CSS transition during drag
                this.track.style.transition = 'none';

                // Desktop cursor feedback
                if (!this.isMobile) {
                    this.track.style.cursor = 'grabbing';
                }

                // DON'T preventDefault() here - wait to determine swipe direction
            }

            onTouchMove = (e) => {
                if (!this.touch.startX || !this.touch.isDragging) return;

                const touch = e.touches ? e.touches[0] : e;
                const now = Date.now();

                this.touch.currentX = touch.clientX;
                this.touch.currentY = touch.clientY;
                this.touch.diff = this.touch.currentX - this.touch.startX;

                // Determine swipe direction on first significant movement
                if (this.touch.isHorizontalSwipe === null) {
                    const deltaX = Math.abs(this.touch.currentX - this.touch.startX);
                    const deltaY = Math.abs(this.touch.currentY - this.touch.startY);

                    // More conservative threshold - require clear horizontal movement
                    if (deltaX > 15 || deltaY > 15) {
                        // Require horizontal movement to be significantly greater than vertical
                        this.touch.isHorizontalSwipe = deltaX > deltaY * 1.5; // 1.5x more horizontal than vertical

                        // If it's vertical scrolling, completely abort carousel handling
                        if (!this.touch.isHorizontalSwipe) {
                            this.touch.isDragging = false;
                            this.touch.startX = 0; // Clear all touch state
                            this.touch.currentX = 0;
                            this.touch.diff = 0;
                            this.touch.samples = [];
                            this.track.style.transition = this.isMobile
                                ? 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                                : 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                            return; // Let the browser handle vertical scrolling
                        }
                    } else {
                        // Not enough movement yet - don't interfere with scrolling
                        return;
                    }
                }

                // Only handle confirmed horizontal swipes
                if (this.touch.isHorizontalSwipe === false) {
                    return; // Let browser handle vertical scrolling
                }

                // Add sample for velocity tracking (optimized for mobile)
                this.touch.samples.push({ x: touch.clientX, time: now });

                // Keep sample history shorter on mobile for performance
                const sampleWindow = this.isMobile ? 60 : 80; // Shortened for faster response
                this.touch.samples = this.touch.samples.filter(sample => now - sample.time < sampleWindow);

                // Get current position and apply drag
                const { slideWidth, cardsToShow, totalCards } = this.getDimensions();
                const newTranslateX = this.momentum.position + this.touch.diff;

                // Apply boundary resistance (same for mobile and desktop)
                let resistedX = newTranslateX;
                const maxTranslateX = -(totalCards - cardsToShow) * slideWidth;

                if (newTranslateX > 0) {
                    resistedX = newTranslateX * 0.3; // Resistance at start
                } else if (newTranslateX < maxTranslateX) {
                    const excess = newTranslateX - maxTranslateX;
                    resistedX = maxTranslateX + (excess * 0.3); // Resistance at end
                }

                this.track.style.transform = `translate3d(${resistedX}px, 0, 0)`;

                // Only preventDefault for horizontal swipes
                if (this.touch.isHorizontalSwipe) {
                    e.preventDefault();
                }
            }

            onTouchEnd = (e) => {
                if (!this.touch.startX) return;

                // If this was determined to be vertical scrolling, don't interfere
                if (this.touch.isHorizontalSwipe === false) {
                    this.touch.startX = 0;
                    this.touch.currentX = 0;
                    this.touch.diff = 0;
                    this.touch.isDragging = false;
                    this.touch.samples = [];
                    return; // Let browser handle the touch end
                }

                const now = Date.now();

                // Calculate velocity from recent samples (works on both mobile and desktop)
                let velocity = 0;
                if (this.touch.samples && this.touch.samples.length >= 2) {
                    // Use fewer samples on mobile for performance, more on desktop for accuracy
                    const sampleCount = this.isMobile ? 2 : 3;
                    const recentSamples = this.touch.samples.slice(-sampleCount);
                    const firstSample = recentSamples[0];
                    const lastSample = recentSamples[recentSamples.length - 1];
                    const timeDiff = lastSample.time - firstSample.time;
                    const positionDiff = lastSample.x - firstSample.x;

                    if (timeDiff > 0) {
                        velocity = positionDiff / timeDiff; // pixels per ms
                    }
                }

                // Update momentum position to current drag position
                this.momentum.position += this.touch.diff;

                // Check if we should start momentum animation - optimized for mobile responsiveness
                const minVelocity = this.isMobile ? 0.2 : 0.3; // Lower threshold on mobile for faster response
                const hasSignificantVelocity = Math.abs(velocity) > minVelocity;
                const hasSignificantDrag = Math.abs(this.touch.diff) > 20;

                if (hasSignificantVelocity) {
                    // Start momentum animation - works on both mobile and desktop
                    this.startMomentum(velocity);
                } else if (hasSignificantDrag) {
                    // Medium drag without velocity - snap to nearest card
                    this.snapToNearestCard(true);
                } else {
                    // Small movement - snap back to current card
                    this.snapToNearestCard(true);
                }

                // Reset touch state
                this.touch.startX = 0;
                this.touch.currentX = 0;
                this.touch.diff = 0;
                this.touch.isDragging = false;
                this.touch.samples = [];

                // Desktop cursor feedback
                if (!this.isMobile) {
                    this.track.style.cursor = 'grab';
                }
            }

            // Momentum physics methods
            startMomentum(velocity) {
                // Stop any existing momentum
                this.stopMomentum();

                // Apply velocity multiplier for mobile amplification
                const amplifiedVelocity = velocity * this.momentum.velocityMultiplier;

                // Initialize momentum state with amplified velocity
                this.momentum.velocity = amplifiedVelocity;
                this.momentum.isActive = true;

                // Disable CSS transitions for smooth RAF animation
                this.track.style.transition = 'none';

                // Start momentum animation loop
                this.momentumAnimation();
            }

            stopMomentum() {
                if (this.momentum.animationId) {
                    cancelAnimationFrame(this.momentum.animationId);
                    this.momentum.animationId = null;
                }
                this.momentum.isActive = false;
                this.momentum.velocity = 0;
            }

            momentumAnimation = () => {
                if (!this.momentum.isActive) return;

                const { slideWidth, cardsToShow, totalCards } = this.getDimensions();
                const maxTranslateX = -(totalCards - cardsToShow) * slideWidth;

                // Apply velocity to position
                this.momentum.position += this.momentum.velocity * 16; // 16ms approximation for 60fps

                // Apply friction to velocity (natural deceleration)
                this.momentum.velocity *= this.momentum.friction;

                // Apply boundary resistance
                let displayPosition = this.momentum.position;
                if (this.momentum.position > 0) {
                    // Resistance at start
                    displayPosition = this.momentum.position * 0.3;
                    this.momentum.velocity *= 0.8; // Extra dampening at boundaries
                } else if (this.momentum.position < maxTranslateX) {
                    // Resistance at end
                    const excess = this.momentum.position - maxTranslateX;
                    displayPosition = maxTranslateX + (excess * 0.3);
                    this.momentum.velocity *= 0.8; // Extra dampening at boundaries
                }

                // Update visual position
                this.track.style.transform = `translate3d(${displayPosition}px, 0, 0)`;

                // Continue animation if velocity is above threshold
                if (Math.abs(this.momentum.velocity) > this.momentum.threshold) {
                    this.momentum.animationId = requestAnimationFrame(this.momentumAnimation);
                } else {
                    // Momentum finished - snap to nearest card
                    this.stopMomentum();
                    this.snapToNearestCard(true);
                }
            }

            snapToNearestCard(smooth = true) {
                const { slideWidth, cardsToShow, totalCards } = this.getDimensions();
                const maxIndex = Math.max(0, totalCards - cardsToShow);

                // Find nearest card index from current momentum position
                let nearestIndex = Math.round(-this.momentum.position / slideWidth);
                nearestIndex = Math.max(0, Math.min(nearestIndex, maxIndex));

                // Calculate how far off we are from the ideal position
                const idealPosition = -nearestIndex * slideWidth;
                const currentOffset = this.momentum.position - idealPosition;
                const offsetThreshold = slideWidth * 0.25; // 25% of card width = significant offset

                // If we're significantly off-center, create a smooth bounce effect
                if (smooth && Math.abs(currentOffset) > offsetThreshold) {
                    this.smoothBounceToCard(nearestIndex, currentOffset);
                } else {
                    // Small offset or no smooth transition - snap directly
                    this.currentIndex = nearestIndex;
                    this.momentum.position = idealPosition;

                    if (smooth) {
                        const transition = this.isMobile
                            ? 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
                            : 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                        this.track.style.transition = transition;
                    }

                    this.updatePosition(smooth);
                }
            }

            // Smooth bounce effect when landing on partial cards
            smoothBounceToCard(targetIndex, currentOffset) {
                const { slideWidth } = this.getDimensions();
                const idealPosition = -targetIndex * slideWidth;

                // Calculate bounce parameters based on offset
                const bounceIntensity = Math.min(Math.abs(currentOffset) / slideWidth, 0.15); // Max 15% bounce
                const bounceDirection = currentOffset > 0 ? -1 : 1; // Opposite direction of offset
                const bounceDistance = bounceIntensity * slideWidth * 0.3; // 30% of bounce intensity

                // Phase 1: Bounce back slightly (overshoot)
                const overshootPosition = idealPosition + (bounceDistance * bounceDirection);

                // Set up elastic bounce transition - quick overshoot
                this.track.style.transition = this.isMobile
                    ? 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

                this.track.style.transform = `translate3d(${overshootPosition}px, 0, 0)`;

                // Phase 2: Settle to final position with elastic ease
                setTimeout(() => {
                    this.track.style.transition = this.isMobile
                        ? 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' // Gentle settle for mobile
                        : 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';   // Smooth settle for desktop

                    this.track.style.transform = `translate3d(${idealPosition}px, 0, 0)`;

                    // Update internal state
                    this.currentIndex = targetIndex;
                    this.momentum.position = idealPosition;
                }, this.isMobile ? 250 : 300); // Match the overshoot duration
            }

            // Bind all events
            bindEvents() {
                if (!this.track) return;

                // Touch events
                this.track.addEventListener('touchstart', this.onTouchStart, { passive: false });
                this.track.addEventListener('touchmove', this.onTouchMove, { passive: false });
                this.track.addEventListener('touchend', this.onTouchEnd, { passive: false });
                this.track.addEventListener('touchcancel', this.onTouchEnd, { passive: false });

                // Mouse events for desktop
                this.track.addEventListener('mousedown', (e) => {
                    this.onTouchStart(e);

                    const onMouseMove = (e) => this.onTouchMove(e);
                    const onMouseUp = (e) => {
                        this.onTouchEnd(e);
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                });

                // Window resize
                window.addEventListener('resize', () => {
                    clearTimeout(this.resizeTimeout);
                    this.resizeTimeout = setTimeout(() => {
                        this.updatePosition(false);
                    }, 100);
                });
            }

            // Reset to first slide
            reset() {
                this.currentIndex = 0;
                this.updatePosition(false);
            }
        }

        // Create global carousel instance
        const carousel = new SimpleCarousel();

        // Updated scrollDestinations function using unified controller
        function scrollDestinations(direction) {
            carousel.move(direction);
        }

        // Simple initialization - drag/touch handling is built into SimpleCarousel
        function addTouchSupport() {
            // Touch support is automatically handled by SimpleCarousel
            console.log('✅ Touch support ready - handled by SimpleCarousel');
        }

        // Make scroll function globally available
        window.scrollDestinations = scrollDestinations;

        // Ensure page starts at top on load
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });

            // Fallback for older browsers
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        // Additional page load handlers for maximum compatibility
        window.addEventListener('load', scrollToTop);
        window.addEventListener('beforeunload', function() {
            scrollToTop();
        });

        // Mobile-specific scroll reset
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🚀 Starting destination gallery with SimpleCarousel...');

            // Force scroll to top first
            scrollToTop();

            generateDestinationCards();

            // Simple initialization
            setTimeout(() => {
                carousel.init(); // Initialize the simple carousel
                resetScrollPosition();
                addTouchSupport();
                console.log('✅ SimpleCarousel ready!');
            }, 100);

            // Add event listeners to buttons as backup
            const prevBtn = document.querySelector('.scroll-btn.prev');
            const nextBtn = document.querySelector('.scroll-btn.next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    console.log('Previous button clicked');
                    scrollDestinations(-1);
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    console.log('Next button clicked');
                    scrollDestinations(1);
                });
            }

            // Final reset after everything is loaded
            setTimeout(() => {
                resetScrollPosition();
                console.log('Final reset completed - should be showing destinations 1-3');
            }, 500);

            setTimeout(initializeMap, 1000);
        });
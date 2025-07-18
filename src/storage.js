// Module for handling localStorage.
import Project from './project';
import ProjectManager from './project-manager';
import UI from './ui';

export default class Storage {

    static init() {
        // Check for existing localStorage data.
        if (!localStorage.getItem('projectList')) {
            Storage.populateExamples();
        } 
        else return;
    }

    static populateExamples() {
        const defaultProject = new Project('Unassigned tasks');
        const project1 = new Project('Home Renovation');
        const project2 = new Project('Website Launch');
        const project3 = new Project('Fitness Goals');
        const project4 = new Project('Summer Vacation Planning');

        defaultProject.addTask(
            'Buy a house', 
            'Get a job that you feel passionate about and work hard, to make enough money to buy a house in the 400k range, or more, if you have a girlfriend that makes money.',
            'medium',
            '2019-09-18T19:00:52Z'
        );
        // Home Renovation tasks
        project1.addTask(
            'Paint living room',
            "Choose between sage green or light gray for the walls. Don't forget to buy painter's tape.",
            'high',
            '2023-06-15T09:00:00Z'
        );
        project1.addTask(
            'Replace kitchen faucet',
            'Purchase new waterfall-style faucet from Home Depot. Watch installation videos beforehand.',
            'medium',
            '2023-06-20T14:00:00Z'
        );
        project1.addTask(
            'Organize garage',
            'Sort items into keep, donate, and trash piles. Install shelving units for storage.',
            'low',
            '2023-07-01T10:00:00Z'
        );
        project1.addTask(
            'Install smart thermostat',
            'Research best models for our HVAC system. Schedule electrician if needed.',
            'medium',
            '2023-06-25T16:00:00Z'
        );
        project1.addTask(
            'Plant backyard garden',
            'Prepare soil, choose drought-resistant plants, and set up irrigation system.',
            'high',
            '2023-05-30T08:00:00Z'
        );
        project1.addTask(
            'Replace bedroom carpet',
            'Get quotes for hardwood flooring vs. new carpet. Measure room dimensions.',
            'medium',
            '2023-07-10T11:00:00Z'
        );
        project1.addTask(
            'Hang artwork',
            'Finalize layout for gallery wall in hallway. Purchase matching frames.',
            'low',
            '2023-06-10T15:00:00Z'
        );

        // Website Launch tasks
        project2.addTask(
            'Finalize homepage design',
            'Get approval from stakeholders on latest mockups. Check mobile responsiveness.',
            'high',
            '2023-05-22T13:00:00Z'
        );
        project2.addTask(
            'Write product descriptions',
            'Create compelling copy for all 12 product pages. Include SEO keywords.',
            'medium',
            '2023-05-25T10:00:00Z'
        );
        project2.addTask(
            'Set up payment gateway',
            'Integrate Stripe API and test transaction process with sandbox account.',
            'high',
            '2023-05-30T16:00:00Z'
        );
        project2.addTask(
            'Create social media content',
            'Prepare 2 weeks of posts for Instagram and Twitter to announce launch.',
            'medium',
            '2023-06-05T14:00:00Z'
        );
        project2.addTask(
            'Test user registration flow',
            'Identify and fix any bugs in the sign-up process. Check email verification.',
            'high',
            '2023-06-01T11:00:00Z'
        );
        project2.addTask(
            'Optimize page load speed',
            'Compress images, enable caching, and minimize CSS/JS files.',
            'medium',
            '2023-05-28T09:00:00Z'
        );
        project2.addTask(
            'Plan launch email campaign',
            'Segment mailing list and create compelling subject lines for maximum open rates.',
            'low',
            '2023-06-08T15:00:00Z'
        );

        // Fitness Goals tasks
        project3.addTask(
            'Join local gym',
            'Tour 3 gyms this week and compare membership options. Bring workout buddy.',
            'high',
            '2023-05-20T18:00:00Z'
        );
        project3.addTask(
            'Meal prep Sundays',
            'Research healthy recipes. Buy containers and plan grocery list.',
            'medium',
            '2023-05-21T10:00:00Z'
        );
        project3.addTask(
            'Run 5K race',
            'Start Couch to 5K program. Register for race in 12 weeks to stay motivated.',
            'high',
            '2023-08-15T08:00:00Z'
        );
        project3.addTask(
            'Strength training routine',
            'Meet with personal trainer to create customized weightlifting program.',
            'medium',
            '2023-05-25T17:00:00Z'
        );
        project3.addTask(
            'Yoga twice weekly',
            'Download yoga app and schedule sessions for Tuesday/Thursday evenings.',
            'low',
            '2023-05-22T19:00:00Z'
        );
        project3.addTask(
            'Track macros',
            'Calculate ideal protein/carb/fat ratios. Download nutrition tracking app.',
            'medium',
            '2023-05-23T12:00:00Z'
        );
        project3.addTask(
            'Buy proper shoes',
            'Get fitted at running store to prevent injuries. Budget $100-150.',
            'low',
            '2023-05-24T16:00:00Z'
        );

        // Summer Vacation Planning tasks
        project4.addTask(
            'Book flights',
            'Compare prices for direct vs connecting flights. Set price alerts.',
            'high',
            '2023-04-30T11:00:00Z'
        );
        project4.addTask(
            'Research hotels',
            'Read recent reviews on TripAdvisor. Prioritize locations near attractions.',
            'medium',
            '2023-05-05T14:00:00Z'
        );
        project4.addTask(
            'Create itinerary',
            'Balance sightseeing with relaxation time. Include some local dining options.',
            'medium',
            '2023-05-15T10:00:00Z'
        );
        project4.addTask(
            'Buy travel insurance',
            'Compare coverage options for medical, cancellations, and lost luggage.',
            'low',
            '2023-05-20T16:00:00Z'
        );
        project4.addTask(
            'Learn basic phrases',
            'Download language app and practice greetings/essential phrases for 10 mins daily.',
            'low',
            '2023-06-01T09:00:00Z'
        );
        project4.addTask(
            'Pack smart',
            "Make checklist based on weather forecast. Don't forget chargers and adapters.",
            'medium',
            '2023-06-10T19:00:00Z'
        );
        project4.addTask(
            'Arrange pet care',
            'Interview pet sitters or research boarding facilities with good reviews.',
            'high',
            '2023-05-25T13:00:00Z'
        );
        ProjectManager.addProject(defaultProject);
        ProjectManager.addProject(project1);
        ProjectManager.addProject(project2);
        ProjectManager.addProject(project3);
        ProjectManager.addProject(project4);

        Storage.storeData();
    }

    static storeData() {
        localStorage.setItem('projectList', JSON.stringify(ProjectManager.getProjectList()));
    }

    static rebuildFromData() {
        ProjectManager.nukeProjects();
        const parsedData = JSON.parse(localStorage.getItem('projectList'));
        
        parsedData.forEach(project => {
            const rebuiltProject = new Project(project.title, project.id);
            
            project.tasks.forEach(task => {
                const dueDate = Storage._parseDate(task.dueDate);
        
                rebuiltProject.addTask(
                    task.title, 
                    task.details,
                    task.priority,
                    dueDate,
                    task.id,
                    task.isComplete
            )});
            
            ProjectManager.addProject(rebuiltProject, rebuiltProject.id)
            
        });

        UI.renderHome();
    }
    
    static _parseDate(date) {
        if (typeof date === 'string'){
            return date;
        } else return ''; // If undefined, replace with empty string, for .slice to work, downstream.
    }
    
}
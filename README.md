# Description

A Todo app made with composition instead of classes to avoid duplication, and
following the SOLID design principles to the best of my abilities.

# Technologies Used

- HTML
- CSS
- JavaScript
- Webpack
- Font Awesome
- Google Fonts
- Local Storage

# Features 

- A default task list.
- Create new task list.
- Update the title of custom task lists.
- Delete the custom task lists.
- Name of the active task list in the header.
- Create new tasks, with title, description, priority and deadline.
- Choose the task list to create the tasks in.
- Update the tasks.
- Mark the tasks as complete or incomplete.
- Colored tasks based on their priority.
- Sort the tasks based on priority and deadline, in ascending and descending order.
- Filter the tasks based on their status (completed, due, overdue), priority (low,
medium, high), and deadline (today, this month, user selected date).
- Save the state in the browser's memory by using the localStorage API.

# Future Additions

- A Show All Tasks button for listing tasks from all task lists and letting the user
sort and filter them.
- A reminder function.
- Styling the tasks based on their status (due, overdue).
- A fully responsive layout, on screens big and small.
- And more...

# What I Learned

- Favoring composition over classes to avoid duplication. The way I've designed my 
factories lets me add or remove fields without touching my existing code. Meaning 
I don't have to create a fool proof blueprint which makes my objects flexible.

- Creating every major node as a seperate module. This lets me change the look and functionality of the app in sections. And most importantly it lets me do what's described in the next point.

- Import state in the modules it's needed instead of passing it as an arguement to nodes that don't need it in order to reach the node that do. The ESM exports are live bindings so there is no closure, which means the UI always renders the current state.

- And the most important one of all, using IDs to reference data instead of putting entire objects in fields for what I assumed was easy access. Since I use Local Storage to preserve state in the browser's memory, putting the active task list object in my state caused me a lot of headache as I struggled to find why my state had frozen. It turns out that the active task list's reference to the task list was breaking upon being saved and retrieved from the Local Storage. It was pretty easily solved by storing the ID of the active task list in the state and using a helper function to retrive the active task list.
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

mongoose.connect('mongodb://localhost:27017/user_poject', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//Роли

const roleSchema = new Schema({
    //Название роли (Менеджер, Дизайнер, Frontend Разработчик...)
    title: { 
        type: String,
        required: true,
    } 
    //...возможно некоторое описание
})

const Role = model('Role', roleSchema)

//Навыки

const skillSchema = new Schema({
    // Название навыки (например pug, дизайн писем, ...)
    title: { 
        type: String,
        required: true,
    } 
    //...возможно некоторое описание
})

const Skill = model('Skill', skillSchema)

//Пользователи

const userSchema = new Schema({
    surname: {
        type: String,
    },
    name: {
        type: String,
    },
    middle_name: {
        type: String,
    },
    role: [{  //Так понял ролей может быть несколько [из ТЗ]
        type:  Schema.Types.ObjectId, 
        ref: 'Role',
    }], 
    accounts: [], //Учетные записи в ТЗ не описаны
    skills: [{
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    }]
})

const User = model('User', userSchema)

//Задачи 

const taskSchema = new Schema({
    //Пользователи-исполнители
    performers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    //Продолжительность (в ms)
    duration: {
        type: Number,
    },
    //Требуемые навыки
    required_skills: [{
        type: Schema.Types.ObjectId, 
        ref: 'Skill',
    }],
    //Зависимость от других задач
    dependence_on_other_tasks: [{
        //Возможно некоторое описание, почему заваисит и т.д.
        reason: String,
        //Ссылка на зависимую задачу.
        dependence_task: {
            type: Schema.Types.ObjectId, 
            ref: 'Task',
        }
    }]
})

const Task = model('Task', taskSchema)

//Проекты

const projectSchema = new Schema({
    customers: [String], //Пока есть только текстовые названия [из ТЗ]
    managers: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    tasks: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task'
    }]
})

const Project = model('Project', projectSchema)
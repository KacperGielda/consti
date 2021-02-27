import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
    namespaced: true,
    state() {
        return {
            activeTasks: [
                [
                    {
                        timeStamps: [8, 12],
                        id: 0,
                    },
                    {
                        timeStamps: [12, 15],
                        id: 1,
                    },
                ],
                [
                    {
                        timeStamps: [12, 13],
                        id: 1,
                    },
                ],
                [
                    {
                        timeStamps: [10, 13],
                        id: 0,
                    },
                ],
                [
                    {
                        timeStamps: [14, 18],
                        id: 1,
                    },
                ],
                [
                    {
                        timeStamps: [8, 12],
                        id: 0,
                    },
                ],
                [],
                [
                    {
                        timeStamps: [18, 20],
                        id: 0,
                    },
                ],
            ],
            activities: [
                {
                    id: 0,
                    date: new Date(),
                    title: "Projekt 01",
                    progress: 0,
                    isActive: true,
                    subTasks: [
                        {
                            id: 0,
                            desc: "Zaprojektuj apkę",
                            status: "done",
                        },
                        {
                            id: 1,
                            desc: "Zbuduj frontend",
                            status: "in-progress",
                        },
                        {
                            id: 2,
                            desc: "Zbuduj API",
                            status: "to-do",
                        },
                        {
                            id: 3,
                            desc: "skonfiguruj PWA",
                            status: "to-do",
                        },
                    ],
                },
                {
                    id: 1,
                    date: new Date(2020, 2, 2),
                    title: "Porządki",
                    progress: 0,
                    isActive: true,
                    subTasks: [
                        {
                            id: 0,
                            desc: "Posprzątaj pokój",
                            status: "done",
                        },
                        {
                            id: 1,
                            desc: "Posprzątaj łaźienke",
                            status: "in-progress",
                        },
                    ],
                },
            ],
        };
    },
    mutations,
    actions,
    getters,
};

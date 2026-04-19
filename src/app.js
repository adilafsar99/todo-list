import renderApp from "./View/Todo.js";
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faX, faPenToSquare);
dom.watch();

renderApp();
const router = require('express').Router();
const { reservation } = require('../../models');
const withAuth = require('../../utils/auth');

//CRUD commands 
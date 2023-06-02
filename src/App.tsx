import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ExpenseTracker from './components/expensetracker'
import "bootstrap/dist/css/bootstrap.css"
import 'regenerator-runtime/runtime'

// import SpeechRecognitionExample from './components/speechRecognition'
import puppeteer from 'puppeteer'
import ExpenseList from './components/expense/expense-list'
import IncomeList from './components/income/income-list'

import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Link, Route, Routes, useMatch } from "react-router-dom";
import AppBar from './components/layout/appbar'
import ExpenseForm from './components/expense/expense-form'
import HomePage from './components/dashboard/homepage'
import IncomeForm from './components/income/income-form'

function Subheader() {
  return (
    <Box p={4} boxShadow="md" position={"fixed"}>

      Subheader

    </Box>
  );
}

function App() {

  return (

    <>
      {/* <button onClick={() => launchBrowser()}>Launch</button> */}
      {/* <ExpenseTracker></ExpenseTracker> */}
      <ChakraProvider>
        <Box mt={16}>
          <Router>
            <AppBar></AppBar>
            {/* <Subheader /> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/expenses/add" element={<ExpenseForm />} />
              <Route path="/incomes" element={<IncomeList />} />
              <Route path="/incomes/add" element={<IncomeForm />} />
            </Routes>


            {/* <ExpenseList></ExpenseList> */}
            {/* <IncomeList></IncomeList> */}
            {/* <SpeechRecognitionExample></SpeechRecognitionExample> */}

          </Router>
        </Box>
      </ChakraProvider>
    </>
  )
}

export default App

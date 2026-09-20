package com.example.calculator

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            CalculatorApp()
        }
    }
}

@Composable
fun CalculatorApp() {

    var display by remember { mutableStateOf("0") }
    var firstNumber by remember { mutableStateOf<Double?>(null) }
    var operator by remember { mutableStateOf<String?>(null) }
    var startNewNumber by remember { mutableStateOf(true) }

    fun numberClick(number: String) {
        if (startNewNumber || display == "Error") {
            display = number
            startNewNumber = false
        } else {
            display += number
        }
    }

    fun operatorClick(op: String) {
        firstNumber = display.toDoubleOrNull()
        operator = op
        startNewNumber = true
    }

    fun calculate() {
        val secondNumber = display.toDoubleOrNull()
        val first = firstNumber
        val op = operator

        if (first == null || secondNumber == null || op == null) {
            return
        }

        if (op == "/" && secondNumber == 0.0) {
            display = "Error"
        } else {
            val result = when (op) {
                "+" -> first + secondNumber
                "-" -> first - secondNumber
                "*" -> first * secondNumber
                "/" -> first / secondNumber
                else -> secondNumber
            }

            display = if (result % 1.0 == 0.0) {
                result.toInt().toString()
            } else {
                result.toString()
            }
        }

        firstNumber = null
        operator = null
        startNewNumber = true
    }

    fun clear() {
        display = "0"
        firstNumber = null
        operator = null
        startNewNumber = true
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Text(
            text = display,
            fontSize = 40.sp,
            modifier = Modifier
                .fillMaxWidth()
                .padding(20.dp)
        )

        Row(modifier = Modifier.fillMaxWidth()) {

            Button(
                onClick = { numberClick("7") },
                modifier = Modifier.weight(1f)
            ) {
                Text("7")
            }

            Button(
                onClick = { numberClick("8") },
                modifier = Modifier.weight(1f)
            ) {
                Text("8")
            }

            Button(
                onClick = { numberClick("9") },
                modifier = Modifier.weight(1f)
            ) {
                Text("9")
            }

            Button(
                onClick = { operatorClick("/") },
                modifier = Modifier.weight(1f)
            ) {
                Text("÷")
            }
        }

        Row(modifier = Modifier.fillMaxWidth()) {

            Button(
                onClick = { numberClick("4") },
                modifier = Modifier.weight(1f)
            ) {
                Text("4")
            }

            Button(
                onClick = { numberClick("5") },
                modifier = Modifier.weight(1f)
            ) {
                Text("5")
            }

            Button(
                onClick = { numberClick("6") },
                modifier = Modifier.weight(1f)
            ) {
                Text("6")
            }

            Button(
                onClick = { operatorClick("*") },
                modifier = Modifier.weight(1f)
            ) {
                Text("×")
            }
        }

        Row(modifier = Modifier.fillMaxWidth()) {

            Button(
                onClick = { numberClick("1") },
                modifier = Modifier.weight(1f)
            ) {
                Text("1")
            }

            Button(
                onClick = { numberClick("2") },
                modifier = Modifier.weight(1f)
            ) {
                Text("2")
            }

            Button(
                onClick = { numberClick("3") },
                modifier = Modifier.weight(1f)
            ) {
                Text("3")
            }

            Button(
                onClick = { operatorClick("-") },
                modifier = Modifier.weight(1f)
            ) {
                Text("-")
            }
        }

        Row(modifier = Modifier.fillMaxWidth()) {

            Button(
                onClick = { numberClick("0") },
                modifier = Modifier.weight(1f)
            ) {
                Text("0")
            }

            Button(
                onClick = { clear() },
                modifier = Modifier.weight(1f)
            ) {
                Text("C")
            }

            Button(
                onClick = { calculate() },
                modifier = Modifier.weight(1f)
            ) {
                Text("=")
            }

            Button(
                onClick = { operatorClick("+") },
                modifier = Modifier.weight(1f)
            ) {
                Text("+")
            }
        }
    }
}
